import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Correspondencia, TipoDocumento, TipoEnvio, TipoEnvioSqlServer, TipoDocumentoSqlServer, UsuariosSqlServer, CorrespondenciaSqlServer } from '../../interface/correspondencia.interface';
import { CorrespondenciaService } from '../../services/correspondencia.service';
import { SesionesService } from '../../../login/services/sesiones.service';
import { map } from 'rxjs/operators';



@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
    .cuadro {
      width: 40%;
      margin-left: 25%;
      margin-right: 25%;
    }

    .ancho {
      width: 80%;
    }
    .ancho2 {
      width: 230%;
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
  tipoEnvio: TipoEnvioSqlServer[] = [];
  tipoDocumento: TipoDocumentoSqlServer[] = []; 
  correos: CorrespondenciaSqlServer[] = [];


  estadoCampos = false;
  estadoDestinatario = false;
  estadoReferencia = false;
  correlativo = '';

  // se establece el formulario
  miFormulario: UntypedFormGroup = this.fb.group({
    IdTipoDocumento: [0, [Validators.required, Validators.min(1)]],  
    IdTipoEnvio: [0, [Validators.required, Validators.min(1)]],   
    IdUsuario: this.loginService.user?.id,
    Destinatario: ['', [Validators.required, Validators.minLength(6)]],
    Referencia: ['', [Validators.required, Validators.minLength(6)]],
  }) 

  //Declaracion de variables a utilizar
  constructor( private fb: UntypedFormBuilder,
               private correosService: CorrespondenciaService,          
               private router: Router,
               private loginService: SesionesService ) { }
  
  //Se inicializan los metodos
  ngOnInit(): void {

   this.traeTipos();

  }  

  /* Metodo que trae los campos tipo envio y tipo documento y rellena los selects*/
  traeTipos() {
    this.correosService.getTipoEnvio() 
       .subscribe( tipo => this.tipoEnvio = tipo );
      
    this.correosService.getTipoDocumento()
       .subscribe( tipo => {
        console.table(tipo)
        this.tipoDocumento = tipo 
      });  
  }

  /* Metodo que permite ingresar una correspondencia */
  async ingresar() {    
    try {     
      //Se extraen los datos del formulario
      const { IdTipoDocumento, IdTipoEnvio, IdUsuario, Destinatario, Referencia } = this.miFormulario.value
      console.log(IdTipoDocumento, IdTipoEnvio, IdUsuario, Destinatario, Referencia )
      //Se corrobora el formulario sea valido
      if(!this.estadoCampos){        
        /** Se extrae el nombre de usuario del servicio login para poder ingresarlo a la correspondencia.
         * Se debe tener en cuenta que toma el usuario que se encuentre logeado en el momento*/
        await this.correosService.ingresaCorrespondencia( IdTipoDocumento, IdTipoEnvio, IdUsuario, Destinatario, Referencia )
        .subscribe( resp => { 
          Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `Correspondencia Guardada Con Exito \n
                  El correlativo es: alguno${this.correlativo}`, 
          showConfirmButton: true 
          })
          //se redirecciona a la pagina que muestra correspondencia 
          this.router.navigate(['/correspondencia/mostrar'])           
        });
          }else {
            console.log('entreo en el else ')
          Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Los campos no pueden estar vacios',         
         })
          }  
    } catch (error) {
      console.log('entro en el catch')
      console.log(error)
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Las credenciales no coinciden',                
      })
    }
  };   
}

