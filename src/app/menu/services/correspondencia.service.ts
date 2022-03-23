import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Correspondencia, CorrespondenciaB, CorrespondenciaModificar, TipoDocumento, TipoEnvio, } from '../interface/correspondencia.interface';

@Injectable({
  providedIn: 'root'
})
export class CorrespondenciaService {

  private baseUrl: string = environment.baseUrl;
  // private _correo!: CorrespondenciaAgregar;

  // get correo() {
  //   return { ...this._correo };
  // }

  constructor( private http: HttpClient) { }  

  getCorrespondencia(): Observable<Correspondencia[]> {
    return this.http.get<Correspondencia[]>('http://localhost:4000/api/correspondencia/mostrar')
  }
 
  getTipoEnvio(): Observable<TipoEnvio[]> {
    return this.http.get<TipoEnvio[]>(`http://localhost:4000/api/correspondencia/mostrar/tipoenvio`)
  }

  getTipoDocumento(): Observable<TipoDocumento[]> {
     return this.http.get<TipoDocumento[]>(`http://localhost:4000/api/correspondencia/mostrar/tipodocumento`)
   }

  ingresaCorrespondencia( idTipoDocumento: number, idTipoEnvio: number,
                          usuario: string, destinatario: string,
                          referencia: string ){

    const url = `http://localhost:4000/api/correspondencia/ingresar`;

    const body = { idTipoDocumento, idTipoEnvio, usuario, destinatario, referencia };
    
    return this.http.post(url , body )
          .pipe(
            tap( resp => {
              console.log(resp)
            } ),
            map( resp => resp),
            catchError( err => of(false) ) 
          )
  }

  modificarPorCorrelativo(correo: CorrespondenciaModificar ): Observable<CorrespondenciaModificar> {
    return this.http.put<CorrespondenciaModificar>(`http://localhost:4000/api/correspondencia/modificar/${ correo.correlativo }`, correo);   

  }

  buscaCorrelativo(filtro: string ): Observable<CorrespondenciaB> {
    return this.http.get<CorrespondenciaB>(`http://localhost:4000/api/correspondencia/${ filtro }`);

  }

  
}
