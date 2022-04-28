import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
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
  

  get usuario() {
    return { ...this._usuario };
  }

  obtenerUsuarios(): Observable<Usuario[]> {
    
    const url = `${this.baseUrl}/login/traeUsuarios`

    return this.http.get<Usuario[]>( url );
  }


  registrarUsuario(idRol: number, email: string, 
    password: string, nombreUsuario: string , estado: number, fech1: string, fech2: string ){

      const url = `${this.baseUrl}/login/register`;
      const body = { idRol, email, password, nombreUsuario , estado, fech1, fech2 };
  
        return this.http.post<RegistrarUsuario>(url , body )
        .pipe(
            map( resp => {
             resp.nombreUsuario              
          } ),            
            catchError( err => of(false) ) 
    );
  }

 loginUsuario(email: string, password: string) {

    const url = `${this.baseUrl}/login`;
    const body = { email, password, };

    return this.http.post<LoginResponse>(url , body )
        .pipe(
            tap( resp => {           
            if( resp.estado ) {
              localStorage.setItem('apiKey', resp.apiKey!)                          
              this._usuario = {
                uid: resp.uid!,
                idRol: resp.idRol!,
                email: resp.email!,
                nombre: resp.nombre!,
                estado: resp.estado!,
                usuarioActivo: resp.usuarioActivo!,
                usuarioNoActivo: resp.usuarioNoActivo!,    
                apiKey: resp.apiKey!
              }                               
            }
          } ),
            map( resp => {
              return resp.estado;
            }),
            catchError( err => of(false) )
        )
  }

  validaApiKey(): Observable<boolean> {

    const url = `${this.baseUrl}/login/validaKey`;
    const headers = new HttpHeaders()
      .set('x-api-key', localStorage.getItem('apiKey') || '')

    return this.http.get<LoginResponse>( url, { headers } )
      .pipe(
        map( resp => {          
          localStorage.setItem('apiKey', resp.apiKey!)
              this._usuario = {
                uid: resp.uid!,
                idRol: resp.idRol,
                nombre: resp.nombre!,
                email: resp.email!,
                estado: resp.estado!,
                usuarioActivo: resp.usuarioActivo!,
                usuarioNoActivo: resp.usuarioNoActivo!,      
                apiKey: resp.apiKey!
              }                
          return resp.estadoMsg;
        }),
        catchError( err => of(false))
      );
  }

  logout(){
    localStorage.removeItem('apiKey');
  }

  traeRoles(): Observable<Roles[]> {

    const url = `${this.baseUrl}/login/traeRoles`

    return this.http.get<Roles[]>( url )
  }

  validaAdmin() {

    const url = `${this.baseUrl}/login/validaAdmin`;
    const headers = new HttpHeaders()
      .set('x-api-key', localStorage.getItem('apiKey') || '')

    return this.http.get<LoginResponse>( url, { headers } )
      .pipe(
        map( resp => { 
          if(resp.idRol === 1) {
            localStorage.setItem('apiKey', resp.apiKey!)            
                this._usuario = {
                  uid: resp.uid!,
                  idRol: resp.idRol!,
                  nombre: resp.nombre!,
                  email: resp.email!,
                  estado: resp.estado!,
                  usuarioActivo: resp.usuarioActivo!,
                  usuarioNoActivo: resp.usuarioNoActivo!,      
                  apiKey: resp.apiKey!
                }                  
            return resp.estadoMsg;
          } else {
            return false;
          }
        }),
        catchError( err => of(false))
      );
  
  }
  buscaUsuario(filtro: string ): Observable<Usuario[]> {
  return this.http.get<Usuario[]>(`${this.baseUrl}/login/filtraUsuario/${ filtro }`);
  }

  buscarPorIdUsuario(filtro: number) : Observable<UsuarioModificar>{
    return this.http.get<UsuarioModificar>(`${this.baseUrl}/login/filtrarUsuariosModificar/${ filtro}`);

  }

  modificarPorIdUsuario(usuario: UsuarioModificar ): Observable<UsuarioModificar> {

    return this.http.put<UsuarioModificar>(`${this.baseUrl}/login/modificar/${ usuario.idUsuario }`, usuario);   

  }

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