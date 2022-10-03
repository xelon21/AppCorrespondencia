import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Correspondencia, CorrespondenciaModificar, TipoDocumento, TipoEnvio, CorrespondenciaB, AgregarCorrespondencia, CorrespondenciaSqlServer, TipoEnvioSqlServer, TipoDocumentoSqlServer } from '../interface/correspondencia.interface';
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
  getCorrespondencia(): Observable<CorrespondenciaSqlServer[]> {
    return this.http.get<CorrespondenciaSqlServer[]>(`${this.baseUrl}/correspondencia`)
    
  }
 
  /** Metodo que trae los tipos de envio */
  getTipoEnvio(): Observable<TipoEnvioSqlServer[]> {
    return this.http.get<TipoEnvioSqlServer[]>(`${this.baseUrl}/tipoEnvio`)
  }

  /** Metodo que trae los tipos de documentos */
  getTipoDocumento(): Observable<TipoDocumentoSqlServer[]> {
     return this.http.get<TipoDocumentoSqlServer[]>(`${this.baseUrl}/tipoDocumento`)
   }

   /** Metodo que ingresa una correspondencia  */
  ingresaCorrespondencia( IdTipoDocumento: number, IdTipoEnvio: number, IdUsuario: number, Destinatario: string, Referencia: string ): Observable<AgregarCorrespondencia>{

     const url = `${this.baseUrl}/correspondencia/agregar`;
    const body = { IdTipoDocumento, IdTipoEnvio, IdUsuario, Destinatario, Referencia };
    return this.http.post<AgregarCorrespondencia>(url , body )
          .pipe(
            tap(resp => {             
              this.refresh.next()
            })           
          )
  }

  /** Metodo que permite modificar una correspondencia por el correlativo */
  modificarPorCorrelativo(IdTipoEnvio: number, Destinatario: string, Referencia: string, EstadoCorreo: string, correlativo2: string ): Observable<CorrespondenciaModificar> {
    
    const url = `${this.baseUrl}/correspondencia/modificar`; 
    let Correlativo = correlativo2;
    const body = { IdTipoEnvio, Destinatario, Referencia, EstadoCorreo, Correlativo }
    return this.http.put<CorrespondenciaModificar>(url, body)
          .pipe(
            tap( resp => {           
              this.refresh.next()
            })
          );   
  }
  
  /** metodo que trae una correspondencia por el correlativo */
  buscaCorrelativo(filtro: string ): Observable<CorrespondenciaSqlServer> {
    return this.http.get<CorrespondenciaSqlServer>(`${this.baseUrl}/correspondencia/filtroCorrelativo?Correlativo=${ filtro }`);

  }

  /** Metodo que trae un arreglo de correspondencias mediante el correlativo */
  filtroCorrelativo(filtro: string ): Observable<Correspondencia[]> {
    return this.http.get<Correspondencia[]>(`${this.baseUrl}/${ filtro }`);

  }

  /** Metodo que permite Filtar las correspondencias por un rango de fechas */
  filtroFechas(inicio: string, final: string): Observable<CorrespondenciaSqlServer[]>{
    return this.http.get<CorrespondenciaSqlServer[]>(`${this.baseUrl}/correspondencia/filtroFechas?inicio=${ inicio }&fin=${ final }`);
  }

}


/** Codigo Desechado */

// buscaUltimo(){
  //   return this.http.get<Correlativo>(`${this.baseUrl}/mostrar/ultimo`);
  // }
