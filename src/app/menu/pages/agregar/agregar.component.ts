import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Correspondencia, TipoDocumento, TipoEnvio, Correlativo } from '../../interface/correspondencia.interface';
import { CorrespondenciaService } from '../../services/correspondencia.service';
import { SesionesService } from '../../../login/services/sesiones.service';


@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
    .ancho {
      width: 80%;
    }
    .ancho2 {
      width: 260%;
    }
    .ancho3 {
      width: 50%;
    }

    .salto {
      margin-top: 10px;
    }
  `
  ]
})
export class AgregarComponent implements OnInit  {  

  // Se declaran los arreglos
  tipoEnvio: TipoEnvio[] = [];
  tipoDocumento: TipoDocumento[] = [];
  correos: Correspondencia[] = [];
  ultimoCorrelativo!: Correlativo;
  estadoCampos = false;
  estadoDestinatario = false;
  estadoReferencia = false;

  // se establece el formulario
  miFormulario: FormGroup = this.fb.group({
    idTipoDocumento: [0, [Validators.required, Validators.min(1)]],  
    idTipoEnvio: [0, [Validators.required, Validators.min(1)]],   
    destinatario: ['', [Validators.required, Validators.minLength(6)]],
    referencia: ['', [Validators.required, Validators.minLength(6)]],
    usuario: this.loginService.usuario.nombre
  }) 

  constructor( private fb: FormBuilder,
               private correosService: CorrespondenciaService,
               //private activatedRoute: ActivatedRoute,
               private router: Router,
               private loginService: SesionesService ) { }
  
    
  ngOnInit(): void {
  
    this.traeTipos();
    
  }  

  /* Metodo que trae los campos tipo envio y tipo documento y rellena los selects*/
  traeTipos() {
    this.correosService.getTipoEnvio() 
       .subscribe( tipo => this.tipoEnvio = tipo );
    
    this.correosService.getTipoDocumento()
       .subscribe( tipo => this.tipoDocumento = tipo );
  }

  /* Metodo que permite ingresar una correspondencia */
  async ingresar() {    
    try {
      
      if(!this.estadoCampos){
        /** Se extrae el nombre de usuario del servicio login para poder ingresarlo a la correspondencia.
         * Se debe tener en cuenta que toma el usuario que se encuentre logeado en el momento*/
        await this.correosService.ingresaCorrespondencia( this.miFormulario.value)
        .subscribe( resp => {
            Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Correspondencia Guardada Con Exito',
            footer:'El correlativo es: ' + resp.correlativo,
            showConfirmButton: true 
            })
            //se redirecciona a la pagina que muestra correspondencia 
            this.router.navigate(['/correspondencia/mostrar'])
            console.log(resp)        
          }); 
          }else {
          Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Los campos no pueden estar vacios',         
         })
      }
    } catch (error) {
      console.log(error)
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Las credenciales no coinciden',                
      })
    }
  };   
}


