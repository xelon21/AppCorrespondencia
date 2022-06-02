import { Component, OnInit } from '@angular/core';
import { CorrespondenciaModificar, TipoEnvio } from '../../interface/correspondencia.interface';
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

  // Se establecen los campos a modificar vacios para luego rellenarlos con los datos traidos mediante
  // los parametros
  correos: CorrespondenciaModificar = {
    idTipoEnvio: 0,
    idUsuario: 0,
    estadoCorreo: '',
    destinatario: '',
    referencia: '',
    correlativo: '',
  }
  us: string = '';
  
  correlativo: string = '';
  tipoEnvio: TipoEnvio[] = [];
  estado: boolean = false; 

  constructor( private correoService: CorrespondenciaService,
               private activatedRouter: ActivatedRoute,
               private router: Router,
               private loginService: SesionesService ) { }

  ngOnInit(): void {    

    // Se trae el correlativo de una correspondencia seleccionada, y mediante el mismo
    // se rellenan los campos con los datos que le pertenecen a ese correlativo
    this.activatedRouter.params
       .pipe(
         switchMap( ({ correlativo }) => this.correoService.buscaCorrelativo(correlativo) )
       )
       .subscribe( correo => {                  
        this.correos = correo 
        console.log(this.correos)        
       })
       this.correoService.getTipoEnvio() 
       .subscribe( tipo => this.tipoEnvio = tipo );
  }

  /** metodo que permite modifiar una correspondencia mediante correlativo */
  async modificar( ){

    /** Se corrobora el estado de la correspondencia  */

    if(!this.estadoCorrespondencia(this.correos.estadoCorreo)){
      /** Si el checkBox del estado esta activado, Se anula la correspondencia y hace la modificacion */

         if(this.estado){
           console.log('tercer if')            
            this.correos.estadoCorreo = 'ANULADO'   
            console.log(this.correos.estadoCorreo);     
            await this.correoService.filtroCorrelativo(this.correos.correlativo)
            .subscribe( result => {   
              console.log(result)
              console.log(this.loginService.usuario.nombreUsuario)           
              if(this.loginService.usuario.nombreUsuario === result[0].nombreUsuario){               
                this.correoService.modificarPorCorrelativo( this.correos )
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
                console.log('tercer else ')               
                Swal.fire({
                  icon: 'error',
                  title: 'ERROR',
                  text: 'No se puede modificar la correspondencia',        
                })
                this.router.navigate(['/correspondencia/mostrar'])
              }  
            });  
            
          }else{ 
            console.log('segundo else')  
            /** Si el checkBox del estado no esta seleccionado, Modifica la correspondencia  */        
            await this.correoService.filtroCorrelativo(this.correos.correlativo)
            .subscribe( result => {
              if(this.loginService.usuario.nombreUsuario === result[0].nombreUsuario){
                console.log('cuarto if')
                this.correoService.modificarPorCorrelativo( this.correos )
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
                console.log('cuarto else')    
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
      console.log('segundo else')
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

