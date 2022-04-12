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

  constructor(private loginService: SesionesService,
              private router: Router,
              private fb: FormBuilder) {

   } 

 loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email, Validators.minLength(3) ]],
    password: ['', [Validators.required, Validators.minLength(3)] ]
  });
  
  ngOnInit(): void {
  }

  async login() {

    // Se extraen los datos del formulario
    const { email, password } = this.loginForm.value;
    try {
      if(!email || !password){
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Debe escribir un usuario y una contraseña',
         
        })
      }else{
        this.loginService.validaAdmin(email, password)
          .subscribe(resp => {
            if (!email) {
              this.estadoEmail = true;
              if (!password) {
                this.estadoPassword = true;
              }
            } else {
              this.estadoEmail = false;
              this.estadoPassword = false;         
                this.loginService.loginUsuario(email, password)
                  .subscribe(resp => {
                    if (resp) {                    
                      Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Se a ingresado correctamente',
                        showConfirmButton: false,
                        timer: 1500
                      })
                      this.esAdmin = resp;
                      this.router.navigateByUrl('/correspondencia/mostrar')
                    } else {
                      console.log('nothin')
                    }
                  });            
            }
          })        
      }
    } catch (error) {
      console.log(error)
    }
  }



}

