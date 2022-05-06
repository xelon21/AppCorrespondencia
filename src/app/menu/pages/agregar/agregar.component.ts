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
    idTipoDocumento: 0,
    idTipoEnvio: 0,   
    destinatario: ['', Validators.required, Validators.minLength(6)],
    referencia: ['', Validators.required, Validators.minLength(6)]
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

  

  validaDestinatario(destinatario: string): boolean{
    if(!destinatario || destinatario.length < 6){
      this.estadoDestinatario = true;
      return this.estadoDestinatario;
    }else {
      this.estadoDestinatario = false;
      return false;
    }
  }

  /* Metodo que permite ingresar una correspondencia */
  async ingresar() {    
    try {
      // Se extraen los datos del formulario
      const { idTipoDocumento, idTipoEnvio, destinatario, referencia } = this.miFormulario.value;

      const usuario = this.loginService.usuario.nombre; 

      //this.estadoCampos = this.validaCampos(destinatario, referencia)
      //console.log(usuario)       
      if(!this.estadoCampos){
        /** Se extrae el nombre de usuario del servicio login para poder ingresarlo a la correspondencia.
         * Se debe tener en cuenta que toma el usuario que se encuentre logeado en el momento*/
        await this.correosService.ingresaCorrespondencia( idTipoDocumento, idTipoEnvio, usuario, destinatario, referencia )
        .subscribe( resp => {
          console.log(resp)        
        });
        this.correosService.getCorrespondencia()
        .subscribe( correos => {
          this.correos = correos;
        })
        this.correosService.buscaUltimo()
        .subscribe( dato => {
          console.log(dato.correlativo)
          this.ultimoCorrelativo = dato;
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Correspondencia Guardada Con Exito',
            footer:'El correlativo es: ' + this.ultimoCorrelativo.correlativo,
            showConfirmButton: true             
        })            
        }) 
        //se redirecciona a la pagina que muestra correspondencia 
        this.router.navigate(['/correspondencia/mostrar'])
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


