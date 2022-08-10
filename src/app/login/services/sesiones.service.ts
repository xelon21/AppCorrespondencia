import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoginResponse, Roles, Usuario, RegistrarUsuario, UsuarioModificar, ModificarPassword, ModificarActivacion } from '../interface/login.interface';

@Injectable({
  providedIn: 'root'
})
export class SesionesService {

  

  constructor(private http: HttpClient) {    
  }

  private baseUrl: string = environment.baseUrl;
  private _usuario!: Usuario;
  private refresh = new Subject<void>();


  get usuario() {
    return { ...this._usuario };
  }

  get refrescar(){
    return this.refresh;
  }

  /** Metodo que permite obtener todos los usuarios de la base de datos. */
  obtenerUsuarios(): Observable<Usuario[]> {
    
    const url = `${this.baseUrl}/login/traeUsuarios`

    return this.http.get<Usuario[]>( url );
          
    
  }


  /** Metodo que permite Registrar a un usuario  */
  registrarUsuario(idRol: number, email: string, 
    password: string, nombreUsuario: string , estado: number, fech1: string ){

      const url = `${this.baseUrl}/login/register`;
      const body = { idRol, email, password, nombreUsuario , estado, fech1 };
  
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

    const url = `${this.baseUrl}/login`;
    const body = { email, password, };

    return this.http.post<LoginResponse>(url , body )
        .pipe(
            tap( resp => {   
            if( resp.Estado ) {
              localStorage.setItem('ApiKey', resp.ApiKey!)                          
              this._usuario = {
                IdUsuario: resp.IdUsuario!,                
                IdRol: resp.IdRol!,
                CorreoUsuario: resp.Email!,
                NombreUsuario: resp.Nombre!,
                Estado: resp.Estado!,
                ActivacionUsuario: resp.UsuarioActivo!,
                DesactivacionUsuario: resp.UsuarioNoActivo!,    
                ApiKey: resp.ApiKey!                
              }                                                 
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

    const url = `${this.baseUrl}/login/validaKey`;
    const headers = new HttpHeaders()
      .set('x-api-key', localStorage.getItem('ApiKey') || '')
      // console.log(localStorage.getItem('ApiKey'))
      // console.log(headers)
    return this.http.get<LoginResponse>( url, { headers } )
      .pipe(
        map( resp => {          
          localStorage.setItem('ApiKey', resp.ApiKey!)
              this._usuario = {
                IdUsuario: resp.IdUsuario!,
                IdRol: resp.IdRol,
                NombreUsuario: resp.Nombre!,
                CorreoUsuario: resp.Email!,
                Estado: resp.Estado!,
                ActivacionUsuario: resp.UsuarioActivo!,
                DesactivacionUsuario: resp.UsuarioNoActivo!,      
                ApiKey: resp.ApiKey!
              }                  
          return resp.EstadoMsg;
        }),
        catchError( err => of(false))
      );
  }
 
  /** Metodo que permite traer los roles de los usuarios  */
  traeRoles(): Observable<Roles[]> {

    const url = `${this.baseUrl}/login/traeRoles`

    return this.http.get<Roles[]>( url )
  }

  /** Metodo que permite la validacion de si un usuario es administrador o no */
  validaAdmin() {

    const url = `${this.baseUrl}/login/validaAdmin`;
    const headers = new HttpHeaders()
      .set('x-api-key', localStorage.getItem('ApiKey') || '')

    return this.http.get<LoginResponse>( url, { headers } )
      .pipe(
        map( resp => { 
          if(resp.IdRol === 1) {
            localStorage.setItem('ApiKey', resp.ApiKey!)            
                this._usuario = {
                  IdUsuario: resp.IdUsuario!,
                  IdRol: resp.IdRol!,
                  NombreUsuario: resp.Nombre! ,
                  CorreoUsuario: resp.Email!,
                  Estado: resp.Estado!,
                  ActivacionUsuario: resp.UsuarioActivo!,
                  DesactivacionUsuario: resp.UsuarioNoActivo!,      
                  ApiKey: resp.ApiKey!
                }                         
            return resp.EstadoMsg;
          } else {
            return false;
          }
        }),
        catchError( err => of(false))
      );
  
  }

  //** Metodo que permite buscar usuarios Por el nombre de usuario  */
  buscaUsuario(filtro: string ): Observable<Usuario[]> {
  return this.http.get<Usuario[]>(`${this.baseUrl}/login/filtraUsuario/${ filtro }`);  
  }

  /** Metodo que permite filtrar a un usuario mediante su Correlativo */
  buscarPorIdUsuario(filtro: number) : Observable<UsuarioModificar>{
    return this.http.get<UsuarioModificar>(`${this.baseUrl}/login/filtrarUsuariosModificar/${ filtro}`);

  }
/** Metodo que permite modificar al usuario mediante su id. */
  modificarPorIdUsuario(usuario: UsuarioModificar ): Observable<UsuarioModificar> {

    return this.http.put<UsuarioModificar>(`${this.baseUrl}/login/modificar/${ usuario.IdUsuario }`, usuario);   

  }
/** Metodo que permite modificar la contraseña de un usuario
 * [Cabe recalcar que es soplo una opcion dentro de la ventana de administracion]
 */
  modificarPassword( password: string, password2: string, idUsuario: number) {

    const url = `${this.baseUrl}/login/modificarPassword/${ idUsuario }`;
    const body = {  password, password2 };
  
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
  modificarEstado(idUsuario: number, estado: boolean, desactivacionUsuario: string | null) {

    const url = `${this.baseUrl}/login/modificarEstado/${ idUsuario }`;
    const body = { estado, desactivacionUsuario };

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
  