import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoginResponse, Roles, Usuario, RegistrarUsuario, UsuarioModificar, ModificarPassword, ModificarActivacion, ModUsuario, Login2, UsuariosSqlServer, IDRolNavigation } from '../interface/login.interface';

@Injectable({
  providedIn: 'root'
})


export class SesionesService {
 

  constructor(private http: HttpClient) {    
  }

  private baseUrl: string = environment.baseUrl;
  private _usuario!: UsuariosSqlServer;
  private refresh = new Subject<void>();
  private _respuestaLogin!: LoginResponse;
  public _idu!: number; 
  private _user!: Login2 | undefined;

  get usuario() {
    return { ...this._usuario };
  }

  get user(){
    return { ...this._user } 
  }

  get respuestaLogin() {
    return { ...this._respuestaLogin }
  }

  get idu() {
    return this._idu
  }

  get refrescar(){
    return this.refresh;
  }

  /** Metodo que permite obtener todos los usuarios de la base de datos. */
  obtenerUsuarios(): Observable<UsuariosSqlServer[]> {
    
    const url = `${this.baseUrl}/login/traeUsuarios`

    return this.http.get<UsuariosSqlServer[]>( url );
          
    
  }


  /** Metodo que permite Registrar a un usuario  */
  registrarUsuario(IdRol: number, Email: string, 
    Password: string, NombreUsuario: string , Estado: number, ActivacionUsuario: string ){

      const url = `${this.baseUrl}/login/register`;
      const body = { IdRol, Email, Password, NombreUsuario , Estado, ActivacionUsuario };
  
        return this.http.post<RegistrarUsuario>(url , body )
        .pipe(
            map( resp => {
             return resp.EstadoMsg;
          } ),     
          tap(() => {            
            this.refresh.next();
          }),       
            catchError( err => of(false) ) 
    );
  }

  /**Metodo que permite eliminar el token y desconectar al usuario */
  logout(logeado: boolean){

    const url = `${this.baseUrl}/logout`;
    const body = { logeado };

    return this.http.post(url , body)
          .subscribe(resp =>{            
            if(resp){
              localStorage.removeItem('apiKey');
            }else {
              return;
            }
          } )
  }
  

  /** Metodo que permite que un usuario pueda ingresar a la aplicacion */
loginUsuario(email: string, password: string) {

    const url = `${this.baseUrl}/login/autenticate`;
    const body = { email, password, };

    return this.http.post<Login2>(url , body )
        .pipe(
            tap( resp => {   
              console.log(resp)                                         
            if( resp ) {         
              localStorage.setItem('ApiKey', resp.token!)   
              this._user = resp;          
            }           
          } ),
            map( resp => {                                          
              return resp;
            }),
            catchError( err => of(false) )
        )
  }

  /**Metodo que permite validar el token del usuario que se inicia sesion */
// validaApiKey(): Observable<boolean> {

//     const url = `${this.baseUrl}/login/validaKey`;
//     const headers = new HttpHeaders()
//       .set('x-api-key', localStorage.getItem('ApiKey') || '')
  
//     return this.http.get<LoginResponse>( url, { headers } )
//       .pipe(
//         map( resp => {          
//           localStorage.setItem('ApiKey', resp.ApiKey!)         
//               this._respuestaLogin = {  
//                 correoUsuario: resp.correoUsuario!,          
//                 IdUsuario: resp.IdUsuario,
//                 IdRol: resp.IdRol,
//                 NombreUsuario: resp.NombreUsuario!,        
//                 Estado: resp.Estado!,                 
//                 ApiKey: resp.ApiKey!,
//                 EstadoMsg: resp.EstadoMsg!
//               }                  
//           return resp.EstadoMsg;
//         }),
//         catchError( err => of(false))
//       );
//   }
 
  /** Metodo que permite traer los roles de los usuarios  */
  traeRoles(): Observable<IDRolNavigation[]> {

    const url = `${this.baseUrl}/login/traeRoles`

    return this.http.get<IDRolNavigation[]>( url )
  }

  /** Metodo que permite la validacion de si un usuario es administrador o no */
  // validaAdmin() {

  //   const url = `${this.baseUrl}/login/validaAdmin`;
  //   const headers = new HttpHeaders()
  //     .set('x-api-key', localStorage.getItem('ApiKey') || '')

  //   return this.http.get<LoginResponse>( url, { headers } )
  //     .pipe(
  //       map( resp => { 
  //         if(resp.IdRol === 1) {
  //           localStorage.setItem('ApiKey', resp.ApiKey!)            
  //               this._respuestaLogin = { 
  //                 correoUsuario: resp.correoUsuario!,                          
  //                 IdUsuario: resp.IdUsuario,
  //                 IdRol: resp.IdRol!,
  //                 NombreUsuario: resp.NombreUsuario!,              
  //                 Estado: resp.Estado!,                      
  //                 ApiKey: resp.ApiKey!,
  //                 EstadoMsg: resp.EstadoMsg!
  //               }                         
  //           return resp.EstadoMsg;
  //         } else {
  //           return false;
  //         }
  //       }),
  //       catchError( err => of(false))
  //     );
  
  // }

  //** Metodo que permite buscar usuarios Por el nombre de usuario  */
  buscaUsuario(filtro: string ): Observable<UsuariosSqlServer[]> {
  return this.http.get<UsuariosSqlServer[]>(`${this.baseUrl}/login/filtraUsuario/${ filtro }`);  
  }

  /** Metodo que permite filtrar a un usuario mediante su Correlativo */
  // buscarPorIdUsuario(IdUsuario: number) : Observable<UsuarioModificar>{
  //   return this.http.get<UsuarioModificar>(`${this.baseUrl}/login/filtrarUsuariosModificar/${ IdUsuario}`);

  // }
  filtrarIdUsuario(IdUsuario: number) : Observable<ModUsuario>{

    const url = `${this.baseUrl}/login/filtrarUsuariosModificar/${ IdUsuario}`;
    return this.http.get<ModUsuario>(url);

  }
/** Metodo que permite modificar al usuario mediante su id. */
  modificarPorIdUsuario(IdRol: number, NombreUsuario: string, CorreoUsuario: string, IdUsuario: number ): Observable<UsuarioModificar> {
    const url = `${this.baseUrl}/login/modificar/${ IdUsuario }`;
    let IUsuario = IdUsuario
    const body = { IdRol, NombreUsuario, CorreoUsuario, IdUsuario, IUsuario}; 
    return this.http.put<UsuarioModificar>(url, body);   

  }
/** Metodo que permite modificar la contraseña de un usuario
 * [Cabe recalcar que es soplo una opcion dentro de la ventana de administracion]
 */
  modificarPassword( Password: string, Password2: string, idUsuario: number) {
    
    const url = `${this.baseUrl}/login/modificarPassword/${ idUsuario }`;
    let IUsuario = idUsuario
    const body = {  Password, Password2, IUsuario };
  
        return this.http.put<ModificarPassword>(url , body )
        .pipe(
            map( resp => {
             return resp;             
          } ),            
            catchError( err => of(false) ) 
    );
    
  }

  /** Metodo que permite modificar el estado de un usuario ya sea inmediatamente o en una fecha especifica
 * [Cabe recalcar que es soplo una opcion dentro de la ventana de administracion]
 */
  modificarEstado(IdUsuario: number, Estado: boolean, DesactivacionUsuario: string | null) {

    const url = `${this.baseUrl}/login/modificarEstado/${ IdUsuario }`;
    const body = { Estado, DesactivacionUsuario };

    console.log(body, url)

        return this.http.put<ModificarActivacion>(url, body)
          .pipe(
            map( resp => {
              return resp;
            }
          ),
          catchError( err => of(false) )
          );
  }

}


/** CODIGO QUE PODRIA OCUPARSE EN ALGUN MOMENTO c: */

// coneccionUsuario(email: string): Observable<ConneccionUsuario> {
  //      const url = `${this.baseUrl}/login/coneccionUsuario`;
  //     console.log(email)
  //      return this.http.post<ConneccionUsuario>( url, {email})
  //               .pipe(
  //                 tap( resp => {
  //                   console.log(resp)
  //                   return resp.estado;
  //                 })
  //               )
  //   }
  
  //   desconeccionUsuario(email: string) {
  //     console.log(email)
  //     const url = `${this.baseUrl}/login/desconeccionUsuario/${email}`;   
   
  //     return this.http.delete<ConneccionUsuario>(url)
  //         .pipe(
  //           tap( resp => {
  //             localStorage.removeItem('apiKey');
  //             return resp.estado;
  //           })
  //         )            
  //  }
  