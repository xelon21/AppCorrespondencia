import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Correspondencia, CorrespondenciaModificar, TipoDocumento, TipoEnvio, CorrespondenciaB, AgregarCorrespondencia } from '../interface/correspondencia.interface';
@Injectable({
  providedIn: 'root'
})

export class CorrespondenciaService {

  // Se declara la url desde las variables de entorno
  private baseUrl: string = environment.baseUrl;

  private refresh = new Subject<void>();
  
  // Se inicialica la variable http como tipo HttpClient
  constructor( private http: HttpClient) { }  

  get refrescar(){
    return this.refresh;
  }

  /* Metodo que trae todas las correspondencias*/
  getCorrespondencia(): Observable<Correspondencia[]> {
    return this.http.get<Correspondencia[]>(`${this.baseUrl}/mostrar`)
  }
 
  /** Metodo que trae los tipos de envio */
  getTipoEnvio(): Observable<TipoEnvio[]> {
    return this.http.get<TipoEnvio[]>(`${this.baseUrl}/mostrar/tipoenvio`)
  }

  /** Metodo que trae los tipos de documentos */
  getTipoDocumento(): Observable<TipoDocumento[]> {
     return this.http.get<TipoDocumento[]>(`${this.baseUrl}/mostrar/tipodocumento`)
   }

   /** Metodo que ingresa una correspondencia  */
  ingresaCorrespondencia( IdTIpoDocumento: number, IdTipoEnvio: number, IdUsuario: number, Destinatario: string, Referencia: string ): Observable<AgregarCorrespondencia>{

     const url = `${this.baseUrl}/ingresar`;
    const body = { IdTIpoDocumento, IdTipoEnvio, IdUsuario, Destinatario, Referencia }; 
    return this.http.post<AgregarCorrespondencia>(url , body )
          .pipe(
            tap(resp => {
              // console.log(resp)
              this.refresh.next()
            })           
          )
  }

  /** Metodo que permite modificar una correspondencia por el correlativo */
  modificarPorCorrelativo(IdTipoEnvio: number, Destinatario: string, Referencia: string, EstadoCorreo: string, Correlativo: string ): Observable<CorrespondenciaModificar> {
    
    const url = `${this.baseUrl}/modificar/${ Correlativo }`;
    let Correlativo2 = Correlativo;
    const body = { IdTipoEnvio, Destinatario, Referencia, EstadoCorreo, Correlativo2 }   
    return this.http.put<CorrespondenciaModificar>(url, body)
          .pipe(
            tap( resp => {             
              this.refresh.next()
            })
          );  
  }
  
  /** metodo que trae una correspondencia por el correlativo */
  buscaCorrelativo(filtro: string ): Observable<CorrespondenciaB> {
    return this.http.get<CorrespondenciaB>(`${this.baseUrl}/filtro/${ filtro }`);

  }

  /** Metodo que trae un arreglo de correspondencias mediante el correlativo */
  filtroCorrelativo(filtro: string ): Observable<Correspondencia[]> {
    return this.http.get<Correspondencia[]>(`${this.baseUrl}/${ filtro }`);

  }

  /** Metodo que permite Filtar las correspondencias por un rango de fechas */
  filtroFechas(inicio: string, final: string): Observable<Correspondencia[]>{
    return this.http.get<Correspondencia[]>(`${this.baseUrl}/filtrar/${ inicio }/${ final }`);
  }

}


/** Codigo Desechado */

// buscaUltimo(){
  //   return this.http.get<Correlativo>(`${this.baseUrl}/mostrar/ultimo`);
  // }
