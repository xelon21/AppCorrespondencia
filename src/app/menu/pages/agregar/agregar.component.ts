import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Correspondencia, TipoDocumento, TipoEnvio } from '../../interface/correspondencia.interface';
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

  // se establece el formulario
  miFormulario: FormGroup = this.fb.group({
    idTipoDocumento: 1,
    idTipoEnvio: 1,   
    destinatario: ['', Validators.required],
    referencia: ['', Validators.required]
  }) 

  constructor( private fb: FormBuilder,
               private correosService: CorrespondenciaService,
               private activatedRoute: ActivatedRoute,
               private router: Router,
               private loginService: SesionesService ) { }
  
  ngOnInit(): void {

    this.traeTipos();

    this.activatedRoute.params.subscribe( ({correlativo}) => console.log(correlativo) )
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
      // Se extraen los datos del formulario
      const { idTipoDocumento, idTipoEnvio, destinatario, referencia } = this.miFormulario.value;
      
      /** Se extrae el nombre de usuario del servicio login para poder ingresarlo a la correspondencia.
       * Se debe tener en cuenta que toma el usuario que se encuentre logeado en el momento*/
      let usuario = this.loginService.usuario.nombre;        
      await this.correosService.ingresaCorrespondencia( idTipoDocumento, idTipoEnvio, usuario, destinatario, referencia )
      .subscribe( resp => {      
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Correspondencia Guardada Con Exito',
          showConfirmButton: false,
          timer: 1500
        })    
      });
      
      //se redirecciona a la pagina que muestra correspondencia 
      this.router.navigate(['/correspondencia/mostrar'])
      
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


