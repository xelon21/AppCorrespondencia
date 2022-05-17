import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginUsuario } from '../../interface/login.interface';
import { SesionesService } from '../../services/sesiones.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
  .margin {
    padding: 40px;
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
  esAdmin: boolean = false;
  coneccion!: boolean;

  constructor(private loginService: SesionesService,
              private router: Router,
              private fb: FormBuilder) {

   } 

   /** se crea el formulario para poder validar el usuario  */
 loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email, Validators.minLength(3) ]],
    password: ['', [Validators.required, Validators.minLength(3)] ]
  });
  
  ngOnInit(): void {
  }

  /** Metodo que permite el login de un usuario */
  async login() {

    // Se extraen los datos del formulario
    const { email, password } = this.loginForm.value;
    try {
      /** se valida que los campos email y password no esten vacios */
      if(!email || !password){
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Debe escribir un usuario y una contraseña',
         
        })
      }else{        
            /** se llama al metodo loginUsuario y se le envian los parametros
                   *  email y password. Dependiendo de la respuesta, ingresara a la pagina
                   *  o le dara un mensaje de error. el usuario no puede ingresar si no 
                   *  se autentica primero.
                   */
            this.loginService.loginUsuario(email, password)
                .subscribe( resp => {                  
                  if(resp) {
                    Swal.fire({
                      position: 'top-end',
                      icon: 'success',
                      title: 'Se a ingresado correctamente',
                      showConfirmButton: false,
                      timer: 1500
                    })
                    // redirecciona a la pagina si se autentica correctamente
                    this.router.navigateByUrl('/correspondencia/agregar')
                    }else {
                      Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Las credenciales no coinciden',                
                      })                                         
                    }
            })    
          }
    } catch (error) {
      console.log(error)
    }
  }

}

