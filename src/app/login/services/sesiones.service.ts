import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoginResponse, Usuario } from '../interface/login.interface';

@Injectable({
  providedIn: 'root'
})
export class SesionesService {

  constructor(private http: HttpClient) { }

  private baseUrl: string = environment.baseUrl;
  private _usuario!: Usuario;

  get usuario() {
    return { ...this._usuario };
  }

  registrarUsuario( idRol: number, email: string, 
    password: string, nombreUsuario: string , estado: number ){

      const url = `${this.baseUrl}/login/registrar`;
      const body = { idRol, email, password, nombreUsuario , estado };

        return this.http.post(url , body )
        .pipe(
            tap( resp => {
            console.log(resp)
          } ),
            map( resp => resp),
            catchError( err => of(false) ) 
    )
  }

  loginUsuario(email: string, password: string) {

    const url = `${this.baseUrl}/login`;
    const body = { email, password, };

    return this.http.post<LoginResponse>(url , body )
        .pipe(
            tap( resp => {           
            if( resp.estadoMsg ) {
              localStorage.setItem('apiKey', resp.apiKey!)
              this._usuario = {
                uid: resp.uid!,
                nombre: resp.nombre!,
                apiKey: resp.apiKey!
              }              
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

          localStorage.setItem('apiKey', resp.apiKey!)
              this._usuario = {
                uid: resp.uid!,
                nombre: resp.nombre!,
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
  
  
}
