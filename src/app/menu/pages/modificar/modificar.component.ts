import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { Correspondencia, CorrespondenciaModificar, TipoEnvio } from '../../interface/correspondencia.interface';
import { CorrespondenciaService } from '../../services/correspondencia.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html',
  styles: []
})
export class ModificarComponent implements OnInit {

  correos: CorrespondenciaModificar = {
    idTipoEnvio: 0,
    usuario: '',
    estadoCorreo: '',
    destinatario: '',
    referencia: ''
  }

  correlativo: string = '';
  tipoEnvio: TipoEnvio[] = [];
  checked: boolean = false;  
  

  
  miFormulario: FormGroup = this.fb.group({
    idTipoEnvio: 0,
    usuario: '',
    estadoCorreo: false,
    destinatario: '',
    referencia: ''
  })

  constructor( private fb: FormBuilder,
               private correoService: CorrespondenciaService,
               private activatedRouter: ActivatedRoute,
               private router: Router ) { }


  
  ngOnInit(): void {

    // this.traeCorreo();

    this.activatedRouter.params
       .pipe(
         switchMap( ({ correlativo }) => this.correoService.buscaCorrelativo(correlativo) )
       )
       .subscribe( correo => this.correos = correo)
    
       this.correoService.getTipoEnvio() 
       .subscribe( tipo => this.tipoEnvio = tipo ); 

      // this.correoService.getCorrespondencia()
      // .subscribe( correo => this.correo = correo)

  }

  regresar() {
    this.router.navigate(['/correspondencia/mostrar'])
  }
  
  // traeCorreo(){
  //   const params = this.activatedRouter.snapshot.params;
  //   if( params['correlativo'] ) {
  //     this.correoService.buscaCorrelativoModificar(params['correlativo'])
  //     .subscribe( resp => {
  //       this.correos = resp;
  //       console.log(resp)
  //     })      
  //   }    
  // }

  // buscar(correlativo: string){

   
    
  //   this.correoService.buscaCorrelativo(correlativo)
  //     .subscribe( datos => console.log(datos))

  //   console.log(this.correlativo);

  // } 
   

  // muestraCorreo() {
  //   this.correoService.filtraCorrelativo(this.miFormulario.value.Correlativo)
  //         .subscribe( filtrado => {
  //           console.log(filtrado) 
  //         })
  // }

  // modifica() {
    
  //   const { IdTipoEnvio, Destinatario, Referencia, Correlativo, EstadoCorreo1 } = this.miFormulario.value;

  //   let EstadoCorreo = this.validaEstado(EstadoCorreo1)
    
  //   console.log(this.miFormulario.value);

  //   this.correoService.modificarCorrespondencia(  IdTipoEnvio, Destinatario, Referencia, Correlativo, EstadoCorreo )
  //   .subscribe( resp => {
  //     console.log(resp)

  //      this.correoService.filtraCorrelativo(Correlativo)
  //     .subscribe( filtrado => {
  //       console.log(filtrado)
        
  //     });
  //   });      
   
  // }

  /*Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Se ha modificado con exito',
          showConfirmButton: false,
          timer: 1500
        }) */

  

  // validaEstado(EstadoCorreo1: boolean): any{
  //   let validacion = '';

  //   if(this.miFormulario.value.Usuario === 'Marcelo Valenzuela'){
  //     if(EstadoCorreo1){
  //       validacion = 'ANULADO'; 
  //       console.log(this.miFormulario.value)       
  //     } else {
  //       validacion = 'GRABADO';        
  //     }  
  //   }else {
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'ERROR',
  //       text: 'No puede modificar esta correspondencia'       
  //     })
  //   } 
  //   return validacion;
  //  }
  
  


 }

