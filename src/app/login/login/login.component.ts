import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginUsuario } from '../interface/login.interface';
import { SesionesService } from '../services/sesiones.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [`
   .bobi{
    display: flex;
    justify-content: center;
    height: 100%;
    align-items: center;
    background-color: #f5f5f5;
  }

  .bobi2{
    display: flex;
    justify-content: center;
    height: 100%;
    align-items: center;    
  }`
  ]
})
export class LoginComponent implements OnInit {

  usuario: LoginUsuario = {
    email: '',
    password: ''
  }
  estadoEmail: boolean = false;
  estadoPassword: boolean = false;
 

  constructor(private loginService: SesionesService,
              private router: Router) { }

  ngOnInit(): void {
  }

  async login () { 
   
    // Se extraen los datos del formulario
    const { email, password } = this.usuario;     

    try {
      // Se validan que los campos no vengan vacios
      if(!email) {
        this.estadoEmail = true;
        if(!password){
          this.estadoPassword = true;
        }
      }else {        
        this.estadoEmail = false;
        this.estadoPassword = false;
        // Se valida el usuario en la api y luego lo redirecciona a la pagina de inicio
        await this.loginService.loginUsuario( email, password )
          .subscribe( resp => {
            if( resp ) {
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Se a ingresado correctamente',
                showConfirmButton: false,
                timer: 1500            
              }) 
              this.router.navigate(['/correspondencia/mostrar']) 
            } else {

            }                       
          });
      }  
    } catch (error) {
      console.log(error);
    }   
    
  }

}

