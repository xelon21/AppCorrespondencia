import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Roles, RegistrarUsuario, UsuarioModificar, ModificarPassword, ModificarActivacion, ModUsuario, Login2, UsuariosSqlServer } from '../interface/login.interface';

@Injectable({
  providedIn: 'root'
})


export class SesionesService {
 

  constructor(private http: HttpClient) {    
  }

  private baseUrl: string = environment.baseUrl;
  private _usuario!: UsuariosSqlServer;
  private refresh = new Subject<void>();
  public _idu!: number; 
  private _user!: Login2 | undefined;

  get usuario() {
    return { ...this._usuario };
  }

  get user(){
    return { ...this._user } 
  }

  get idu() {
    return this._idu
  }

  get refrescar(){
    return this.refresh;
  }

  /** Metodo que permite obtener todos los usuarios de la base de datos. */
  obtenerUsuarios(): Observable<UsuariosSqlServer[]> {
    
    const url = `${this.baseUrl}/usuarios`

    return this.http.get<UsuariosSqlServer[]>( url );
          
    
  }


  /** Metodo que permite Registrar a un usuario  */
  registroUsuario(IdRol: number, CorreoUsuario: string, 
    Password: string, Nombre: string , Estado: number, ActivacionUsuario: string ) : Observable<RegistrarUsuario>{

      // const url = `${this.baseUrl}/usuarios/registrar`;
      const url = `https://localhost:7196/api/usuarios/registrar`;
      const body = { IdRol, CorreoUsuario, Password, Nombre , Estado, ActivacionUsuario };    
        return this.http.post<RegistrarUsuario>(url , body )
        .pipe(
          tap(resp => {
            if(!resp){
              return false
            }            
            this.refresh.next()
            return true
            
          })           
        );
    //     .pipe(
    //         map( resp => {
    //           console.log(resp)
    //          return true;
    //       } ),     
    //       tap(() => {            
    //         this.refresh.next();
    //       }),       
    //         catchError( err => of(false) ) 
    // );
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
validaApiKey(): Observable<boolean> {

  const headers = new HttpHeaders()
    .set('x-api-key', localStorage.getItem('ApiKey') || '')
  const hed = localStorage.getItem('ApiKey');
  if(hed === null){
    return of(false);
  }else{
    const url = `${this.baseUrl}/login/validar?token=${hed}`;
    return this.http.post<Login2>( url, {headers} )
      .pipe(
        map( resp => {          
          localStorage.setItem('ApiKey', resp.token!)         
              this._user = {  
                correoUsuario: resp.correoUsuario!,          
                id: resp.id,
                idRol: resp.idRol,
                token: resp.token,
                estado: resp.estado             
              }               
          return true;
        }),
        catchError( err => of(false))
      );
  }
  }
 
  /** Metodo que permite traer los roles de los usuarios  */
  traeRoles(): Observable<Roles[]> {

    const url = `${this.baseUrl}/roles`

    return this.http.get<Roles[]>( url )
  }

  /** Metodo que permite la validacion de si un usuario es administrador o no */
  validaAdmin() {
    const headers = new HttpHeaders()
    .set('x-api-key', localStorage.getItem('ApiKey') || '')
  const hed = localStorage.getItem('ApiKey');
  if(hed === null){
    return of(false);
  }else{
    const url = `${this.baseUrl}/login/validar?token=${hed}`;
    return this.http.post<Login2>( url, { headers } )
      .pipe(
        map( resp => { 
          if(resp.idRol === 1) {
            localStorage.setItem('ApiKey', resp.token!)            
                this._user = { 
                  correoUsuario: resp.correoUsuario!,                          
                  id: resp.id,
                  token: resp.token,
                  idRol: resp.idRol,
                  estado: resp.estado  
                }                         
            return true;
          } else {
            return false;
          }
        }),
        catchError( err => of(false))
      );
    }
  }

  //** Metodo que permite buscar usuarios Por el nombre de usuario  */
  // buscaUsuario(filtro: string ): Observable<UsuariosSqlServer[]> {
  // return this.http.get<UsuariosSqlServer[]>(`${this.baseUrl}/usuarios/${ filtro }`);  
  // }

  /** Metodo que permite filtrar a un usuario mediante su Correlativo */
  // buscarPorIdUsuario(IdUsuario: number) : Observable<UsuarioModificar>{
  //   return this.http.get<UsuarioModificar>(`${this.baseUrl}/login/filtrarUsuariosModificar/${ IdUsuario}`);
  // }
  filtrarIdUsuario(IdUsuario: number) : Observable<ModUsuario>{

    const url = `${this.baseUrl}/usuarios/${ IdUsuario}`;
    return this.http.get<ModUsuario>(url);

  }
/** Metodo que permite modificar al usuario mediante su id. */
  modificarPorIdUsuario(IdRol: number, NombreUsuario: string, CorreoUsuario: string, IdUsuario: number ): Observable<UsuarioModificar> {
    const url = `${this.baseUrl}/usuarios/modificar`;
    const body = { IdRol, NombreUsuario, CorreoUsuario, IdUsuario}; 
    return this.http.put<UsuarioModificar>(url, body);   

  }
/** Metodo que permite modificar la contraseña de un usuario
 * [Cabe recalcar que es soplo una opcion dentro de la ventana de administracion]
 */
  modificarPassword( Password: string, Password2: string, idUsuario: number) {
    
    const url = `${this.baseUrl}/usuarios/modificarPassword?id=${ idUsuario }`;
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
   modificarEstado(id: number, estado: number, desactivacionUsuario: string) {

    const url = `${this.baseUrl}/usuarios/modificarEstado?id=${id}`;
    const body = { estado, desactivacionUsuario };

        return this.http.put<ModificarActivacion>(url, body)
          .pipe(
            tap( data => {            
            }),
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
  