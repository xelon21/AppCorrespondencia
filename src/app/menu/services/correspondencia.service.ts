import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Correspondencia, CorrespondenciaB, CorrespondenciaModificar, TipoDocumento, TipoEnvio, Correlativo, AgregarCorrespondencia } from '../interface/correspondencia.interface';

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
  ingresaCorrespondencia( correo: AgregarCorrespondencia ): Observable<AgregarCorrespondencia>{

     const url = `${this.baseUrl}/ingresar`;
    // const body = { idTipoDocumento, idTipoEnvio, usuario, destinatario, referencia };    
    return this.http.post<AgregarCorrespondencia>(url , correo )
          .pipe(
            tap(resp => {
              //console.log(resp.correlativo)
              this.refresh.next()
            })           
          )
  }

  /** Metodo que permite modificar una correspondencia por el correlativo */
  modificarPorCorrelativo(correo: CorrespondenciaModificar ): Observable<CorrespondenciaModificar> {
    return this.http.put<CorrespondenciaModificar>(`${this.baseUrl}/modificar/${ correo.correlativo }`, correo)
          .pipe(
            tap( resp => {
              this.refresh.next()
            })
          );  
  }

  buscaUltimo(){
    return this.http.get<Correlativo>(`${this.baseUrl}/mostrar/ultimo`);
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
