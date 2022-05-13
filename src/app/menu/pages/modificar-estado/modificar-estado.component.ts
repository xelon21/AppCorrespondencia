import { Component, Inject, OnInit } from '@angular/core';
import { SesionesService } from '../../../login/services/sesiones.service';
import { ModificarActivacion, UsuarioModificar } from '../../../login/interface/login.interface';
import { FormControl, FormGroup } from '@angular/forms';
import { FormatoFecha } from '../../interface/correspondencia.interface';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modificar-estado',
  templateUrl: './modificar-estado.component.html',
  styles: [`

.input2 {
  margin-right: 40px;
  margin-left: 25px;
  margin-top: 20px;
}

  .spacer2 {
    flex: 2 2 auto;
   }

   .input {
     margin-right: 50px;
   }

    .ancho {
      width: 80%;
    }
    .ancho2 {
      width: 175%;
    }
    .ancho3 {
      width: 150%;
      margin-left: 230px;
    }
    .ancho4 {
      width: 175%;
      background-color: #efefef;
    }
    .ancho5 {
      width: 100%;
    }

    .salto {
      margin-top: 10px;
    }
  `
  ]
})
export class ModificarEstadoComponent implements OnInit {

  fecha1!: FormatoFecha;

  estado: ModificarActivacion = {
    idUsuario: 0,
    estado: false,
    desactivacionUsuario: ''    
  }

  usuario: UsuarioModificar = {
    idUsuario: 0,
    idRol: 0,
    correoUsuario: '',
    password: '',
    password2: '',   
    nombreUsuario: '',
    desactivacionUsuario: '',
    estado: false
  }

  fecha = new FormGroup({
    desactivacionUsuario: new FormControl()    
  });

  constructor( private loginService: SesionesService,
               private router: Router,
               @Inject(MAT_DIALOG_DATA) public data: UsuarioModificar) { }

  ngOnInit(): void {
  }


  /** Metodo que permite modificar el estado de un usuario */
  modificarEstado() {

    /** Se valida que los campos no vengan vacios */
    if(this.fecha.controls['desactivacionUsuario'].valid && this.fecha.value.desactivacionUsuario != null){
      this.estado.estado = false;
      this.fecha1 = this.fecha.controls['desactivacionUsuario'].value._i
      let fechaFinal: string = this.fecha1.year + '-' + (this.fecha1.month + 1 ).toString() + '-' + this.fecha1.date;

      this.loginService.modificarEstado(this.data.idUsuario, this.estado.estado, fechaFinal)
          .subscribe(resp => {
            if(resp){
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Se ha modificado la fecha de desactivacion',
                showConfirmButton: false,
                timer: 1500
              })
              this.router.navigate(['/correspondencia/administrador'])
            }else {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al ingreso de los datos',                
              })
            }
          })
    }else {
      if(this.estado.estado){
        let fecha = null;
        this.loginService.modificarEstado(this.data.idUsuario, this.estado.estado, fecha)
              .subscribe( resp => {
                if(resp){
                  Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Se ha modificado el estado del usuario',
                    showConfirmButton: false,
                    timer: 1500
                  }) 
                  this.router.navigate(['/correspondencia/administrador'])
                }else{
                  Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error al ingreso de los datos',                
                  })
                }
              })
        
      }
    }


  }
}
