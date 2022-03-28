import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Correspondencia, TipoDocumento, TipoEnvio } from '../../interface/correspondencia.interface';
import { CorrespondenciaService } from '../../services/correspondencia.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
    .ancho {
      width: 80%;
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
               private router: Router ) { }
  
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
    
    // Se extraen los datos del formulario
    const { idTipoDocumento, idTipoEnvio, usuario, destinatario, referencia } = this.miFormulario.value;        

    await this.correosService.ingresaCorrespondencia( idTipoDocumento, idTipoEnvio, usuario, destinatario, referencia )
    .subscribe( resp => {
      console.log(resp)
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
  };   
}


