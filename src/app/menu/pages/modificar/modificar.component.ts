import { Component, OnInit } from '@angular/core';
import { CorrespondenciaB, CorrespondenciaModificar, TipoEnvio } from '../../interface/correspondencia.interface';
import { CorrespondenciaService } from '../../services/correspondencia.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { switchMap, tap, catchError, map } from 'rxjs/operators';
import Swal from 'sweetalert2';


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
    usuario: '',
    estadoCorreo: '',
    destinatario: '',
    referencia: '',
    correlativo: '',
    us: ''
  }
  us: string = '';
  
  correlativo: string = '';
  tipoEnvio: TipoEnvio[] = [];
  estado: boolean = false; 

  constructor( private correoService: CorrespondenciaService,
               private activatedRouter: ActivatedRoute,
               private router: Router ) { }

  ngOnInit(): void {    

    // Se trae el correlativo de una correspondencia seleccionada, y mediante el mismo
    // se rellenan los campos con los datos que le pertenecen a ese correlativo
    this.activatedRouter.params
       .pipe(
         switchMap( ({ correlativo }) => this.correoService.buscaCorrelativo(correlativo) )
       )
       .subscribe( correo => {                  
        this.correos = correo         
       })
       this.correoService.getTipoEnvio() 
       .subscribe( tipo => this.tipoEnvio = tipo );
  }

  /** metodo que permite modifiar una correspondencia mediante correlativo */
  async modificar( ){

    if(!this.estadoCorrespondencia(this.correos.estadoCorreo)){      
         if(this.estado){
           console.log('1 Pasa por aca')       
            this.correos.estadoCorreo = 'ANULADO'
            console.log('2 Pasa por aca') 
            await this.correoService.filtroCorrelativo(this.correos.correlativo)
            .subscribe( result => {              
              if(this.correos.usuario === result[0].usuario){
                this.correoService.modificarPorCorrelativo( this.correos )
                .subscribe( correo => this.correos = correo)  
                console.log('se subscribe y se modifica')
                Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: 'Your work has been saved',
                  showConfirmButton: false,
                  timer: 1500
                }) 
                this.router.navigate(['/correspondencia/mostrar']) 

              }else {
                console.log('4 por aca si no son iguales los usuarios')
                Swal.fire({
                  icon: 'error',
                  title: 'ERROR',
                  text: 'No se puede modificar la correspondencia',        
                })
                this.router.navigate(['/correspondencia/mostrar'])
              }  
            });  
            
          }else{           
            await this.correoService.filtroCorrelativo(this.correos.correlativo)
            .subscribe( result => {              
              if(this.correos.usuario === result[0].usuario){
                this.correoService.modificarPorCorrelativo( this.correos )
                .subscribe( correo => this.correos = correo)  
                console.log('se subscribe y se modifica')
                Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: 'Your work has been saved',
                  showConfirmButton: false,
                  timer: 1500
                }) 
                this.router.navigate(['/correspondencia/mostrar']) 

              }else {
                console.log('4 por aca si no son iguales los usuarios')
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
      console.log('6 por aca si la correspondencia esta como anulada')
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

