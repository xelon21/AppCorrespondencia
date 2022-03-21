import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  
  tipoEnvio: TipoEnvio[] = [];
  tipoDocumento: TipoDocumento[] = [];
  correos: Correspondencia[] = [];
  

  miFormulario: FormGroup = this.fb.group({
    idTipoDocumento: 5,
    idTipoEnvio: 3,
    usuario: ['Marcelo Valenzuela', Validators.required],
    destinatario: ['FrontEnd', Validators.required],
    referencia: ['BackEnd', Validators.required]
  })

  
 

  constructor( private fb: FormBuilder,
               private correosService: CorrespondenciaService,
               private activatedRoute: ActivatedRoute ) { }


  
  ngOnInit(): void {

    this.traeTipos();

    this.activatedRoute.params.subscribe( ({correlativo}) => console.log(correlativo) )

  }  
  
  traeTipos() {
    this.correosService.getTipoEnvio() 
       .subscribe( tipo => this.tipoEnvio = tipo );
    
       this.correosService.getTipoDocumento()
       .subscribe( tipo => this.tipoDocumento = tipo );
  }

  ingresar() { 

    //console.log(this.miFormulario.value) 
    
    const { idTipoDocumento, idTipoEnvio, usuario, destinatario, referencia } = this.miFormulario.value;
        

    this.correosService.ingresaCorrespondencia( idTipoDocumento, idTipoEnvio, usuario, destinatario, referencia )
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
  };      
   
  
  


 // displayedColumns: string[] = ['Usuario', 'NombreDocumento', 'TipoEnvio', 'Destinatario', 'Referencia', 'Fecha', 'Correlativo', 'EstadoCorreo', 'Modificar'];

 
}


