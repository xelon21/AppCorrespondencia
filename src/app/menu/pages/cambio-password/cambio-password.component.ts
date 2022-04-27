import { Component, Inject, OnInit } from '@angular/core';
import { ModificarPassword, UsuarioModificar } from '../../../login/interface/login.interface';
import { SesionesService } from '../../../login/services/sesiones.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-cambio-password',
  templateUrl: './cambio-password.component.html',
  styles: [`
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
  `]
})
export class CambioPasswordComponent implements OnInit {
  
  mod: ModificarPassword = {
    idUsuario: 0,
    password: '',
    password2: ''
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

  constructor( private loginService: SesionesService,               
               private router: Router,
               @Inject(MAT_DIALOG_DATA) public data: UsuarioModificar ) { }

  ngOnInit(): void {
   
  }


  modificarPassword() {
    try {
      if( !this.mod.password || !this.mod.password2){
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error Los campos estan vacios',                
        })
      }else{
        if( this.mod.password != this.mod.password2 ){
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Las contraseñas no coinciden',                
          })
        }else {       
          this.loginService.modificarPassword(this.mod.password, this.mod.password2, this.data.idUsuario )
              .subscribe( resp => {               
                if(resp){
                  Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Se cambio la contraseña con exito',
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
        }
      }      
    } catch (error) {
      console.log(error)
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Contacte con el administrador',                
      })
    }
  }

}
