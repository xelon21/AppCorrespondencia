import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { LoginUsuario } from '../../interface/login.interface';
import { SesionesService } from '../../services/sesiones.service';

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
  esAdmin: boolean = false;

  constructor(private loginService: SesionesService,
    private router: Router) { }

  ngOnInit(): void {
  }

  async login() {

    // Se extraen los datos del formulario
    const { email, password } = this.usuario;
    try {
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
            if (resp) {
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
                    this.router.navigateByUrl('/correspondencia/registrar')
                  }
                })
            } else {
              this.loginService.loginUsuario(email, password)
                .subscribe(resp => {
                  if (resp) {
                    console.log('Solo pasa si no es admin', resp);
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
          }
        })
    } catch (error) {
      console.log(error)
    }
  }



}

