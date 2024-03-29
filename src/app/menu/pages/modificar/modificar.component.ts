import { Component, OnInit } from '@angular/core';
import { CorrespondenciaModificar, TipoEnvio, TipoEnvioSqlServer, CorrespondenciaSqlServer } from '../../interface/correspondencia.interface';
import { CorrespondenciaService } from '../../services/correspondencia.service';
import { ActivatedRoute, Router } from '@angular/router';

import { switchMap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { SesionesService } from '../../../login/services/sesiones.service';


@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html',
  styles: [`
  .marg {
    margin-right:
  }
  .ancho2 {
    width: 80%;
  }
  .ancho3 {
    width: 50%;
  }
  
  .ancho {
    width: 260%;    
  }
  `]
})
export class ModificarComponent implements OnInit {

  get login2() {  
    return  this.loginService.user;
  }

  // Se establecen los campos a modificar vacios para luego rellenarlos con los datos traidos mediante
  // los parametros
  correosql!: CorrespondenciaSqlServer;

  correos: CorrespondenciaModificar = {
    IdTipoEnvio: 0,
    IdUsuario: 0,
    EstadoCorreo: '',
    Destinatario: '',
    Referencia: '',
    Correlativo: '',
  }
  us: string = '';
  
  correlativo: string = '';
  tipoEnvio: TipoEnvioSqlServer[] = [];
  estado: boolean = false; 

  /**Se declaran las clases a utilizar */
  constructor( private correoService: CorrespondenciaService,
               private activatedRouter: ActivatedRoute,
               private router: Router,
               private loginService: SesionesService ) { }

  /**Se incializan los metodos al cargar la pagina  */
  ngOnInit(): void {    

    // Se trae el correlativo de una correspondencia seleccionada, y mediante el mismo
    // se rellenan los campos con los datos que le pertenecen a ese correlativo
    this.activatedRouter.params
       .pipe(
         switchMap( ({ correlativo }) => this.correoService.buscaCorrelativo(correlativo) )
       )
       .subscribe( correo => {
        this.correosql = correo 
         this.correos = {
          IdTipoEnvio: this.correosql.idTipoEnvio,
          IdUsuario: this.correosql.idUsuario,
          EstadoCorreo: this.correosql.estadoCorreo,
          Destinatario: this.correosql.destinatario,
          Referencia: this.correosql.referencia,
          Correlativo : this.correosql.correlativo
        }
       })
       this.correoService.getTipoEnvio() 
       .subscribe( tipo => this.tipoEnvio = tipo );
  }

  /** metodo que permite modifiar una correspondencia mediante correlativo */
  async modificar( ){
    
    /** Se corrobora el estado de la correspondencia  */
    if(!this.estadoCorrespondencia(this.correos.EstadoCorreo)){
      /** Si el checkBox del estado esta activado, Se anula la correspondencia y hace la modificacion */
      const { IdTipoEnvio, IdUsuario, Destinatario, Referencia, EstadoCorreo, Correlativo } = this.correos
      
      /**Si el checkbox del estado del correo esta marcado y el correo es 'GRABADO', Se cambiara el estado a 'ANULADO'
       */
      if(this.estado){ 
        await this.correoService.buscaCorrelativo(this.correos.Correlativo)
        .subscribe( result => {             
              if(this.loginService.user.id === result.idUsuario){   
                let Correlativo2 = this.correos.Correlativo;         
                this.correoService.modificarPorCorrelativo( IdTipoEnvio, Destinatario, Referencia, 'ANULADO', Correlativo2 )
                .subscribe( correo => this.correos = correo)                                
                Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: 'Se ha modificado',
                  showConfirmButton: false,
                  timer: 1500
                }) 
                this.router.navigate(['/correspondencia/mostrar']) 

              }else {                      
                Swal.fire({
                  icon: 'error',
                  title: 'ERROR',
                  text: 'No se puede modificar la correspondencia',        
                })
                this.router.navigate(['/correspondencia/mostrar'])
              }  
            });  
            
          }else{  
            /** Si el checkBox del estado no esta seleccionado, Se modificara la correspondencia sin alterar su estado */        
            await this.correoService.buscaCorrelativo(this.correos.Correlativo)
            .subscribe( result => {    
              if(this.loginService.user.id === result.idUsuario){
                let Correlativo2 = this.correos.Correlativo;         
                this.correoService.modificarPorCorrelativo( IdTipoEnvio, Destinatario, Referencia, EstadoCorreo, Correlativo2)
                .subscribe( correo =>{                 
                  this.correos = correo
                })                 
                Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: 'Se ha modificado',
                  showConfirmButton: false,
                  timer: 1500
                }) 
                this.router.navigate(['/correspondencia/mostrar']) 
              }else {     
                Swal.fire({
                  icon: 'error',
                  title: 'ERROR',
                  text: 'No se puede modificar la correspondencia',        
                })
                this.router.navigate(['/correspondencia/mostrar'])
              }  
            }); 
          } 
    }else {  
      Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: 'No se puede modificar una correspondencia anulada',        
          })
          this.router.navigate(['/correspondencia/mostrar'])
      return ;  
    }
  }




  /** Metodo que verifica el estado de una correspondencia.
   * si esta esta anulada, no puede modificarse 
   */
  estadoCorrespondencia(estado: string):boolean {
    if(estado === 'ANULADO'){   
      Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: 'No se puede modificar una correspondencia anulada',        
      })      
          return true;
    }else {      
      return false;
    }    
  }
 }

