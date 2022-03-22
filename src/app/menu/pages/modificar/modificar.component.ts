import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CorrespondenciaModificar, TipoEnvio } from '../../interface/correspondencia.interface';
import { CorrespondenciaService } from '../../services/correspondencia.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html',
  styles: [`
  .marg {
    margin-right:
  }
  `]
})
export class ModificarComponent implements OnInit {

  correos: CorrespondenciaModificar = {
    idTipoEnvio: 0,
    usuario: '',
    estadoCorreo: '',
    destinatario: '',
    referencia: '',
    correlativo: ''
  }

  
  correlativo: string = '';
  tipoEnvio: TipoEnvio[] = [];
  estado: boolean = false;  
  

  constructor( private correoService: CorrespondenciaService,
               private activatedRouter: ActivatedRoute,
               private router: Router ) { }


  
  ngOnInit(): void {

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

  modificar( ){
    
    if(!this.estadoCorrespondencia(this.correos.estadoCorreo)){      
         if(this.estado){          
            this.correos.estadoCorreo = 'ANULADO'            
            this.correoService.modificarPorCorrelativo( this.correos )
            .subscribe( correo => this.correos = correo)            

          }else {
             this.correoService.modificarPorCorrelativo( this.correos )
            .subscribe( correo => this.correos = correo)
            
          }
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Correspondencia modificada Con Exito',
            showConfirmButton: false,
            timer: 1500
          })  
          this.router.navigate(['/correspondencia/mostrar'])
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

  regresar() {
    
  }
  


 }

