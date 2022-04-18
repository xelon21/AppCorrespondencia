import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoginResponse, Roles, Usuario } from '../interface/login.interface';

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


  registrarUsuario(idUsuario: number, idRol: number, email: string, 
    password: string, nombreUsuario: string , estado: number ){

      const url = `${this.baseUrl}/login/register`;
      const body = { idUsuario, idRol, email, password, nombreUsuario , estado };

        return this.http.post(url , body )
        .pipe(
            tap( resp => {
            console.log(resp)
          } ),
            map( resp => resp),
            catchError( err => of(false) ) 
    );
  }

 loginUsuario(email: string, password: string) {

    const url = `${this.baseUrl}/login`;
    const body = { email, password, };

    return this.http.post<LoginResponse>(url , body )
        .pipe(
            tap( resp => {           
            if( resp.estadoMsg ) {
              localStorage.setItem('apiKey', resp.apiKey!)
              localStorage.setItem('cookie', resp.idRol.toString())              
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
              console.log('login ususario: ', this._usuario)                  
            }
          } ),
            map( resp => resp.estadoMsg),
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
          console.log('validaapiKey (map-localstorage): ', resp.apiKey)
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
              console.log('Validaapikey (fin):  ', resp.nombre, resp.idRol)
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
            console.log('validaAdmin (map-localstorage): ', resp.apiKey)
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
                console.log('ValidaAdmin (fin):  ', this._usuario)
            return resp.estadoMsg;
          } else {
            return false;
          }
        }),
        catchError( err => of(false))
      );
  
 }
}