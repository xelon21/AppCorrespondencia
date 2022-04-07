import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrarUsuario, Roles } from 'src/app/login/interface/login.interface';
import { SesionesService } from 'src/app/login/services/sesiones.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
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
export class RegistrarComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    idUsuario: [0, Validators.required],
    idRol: [0, Validators.required],
    correoUsuario: ['', Validators.required],
    password: ['', Validators.required],
    nombreUsuario: ['', Validators.required],
    estado: true      
  }) 

  roles: Roles[] = [];

  usuario: RegistrarUsuario[] = [];

  estadoEmail: boolean = false;
  estadoPassword: boolean = false;
  esAdmin: boolean = false;
  router: any;

  constructor(private fb: FormBuilder,
              private loginService: SesionesService) { }

  ngOnInit(): void {
    this.loginService.traeRoles()
        .subscribe( resp => this.roles = resp);
    
    this.validaApiKey();
  }

  validaApiKey(){
    let key = localStorage.getItem.arguments
    console.log(key)
  }

  async registrar() {

    // try {
    //   console.log(this.miFormulario.value)
    //   // Se extraen los datos del formulario
         const { idUsuario, idRol, correoUsuario, password, nombreUsuario, estado } = this.miFormulario.value;
           

    //   await this.loginService.validaUsuariosAdmin( )

      
      
    // } catch (error) {
      
    // }


    await this.loginService.registrarUsuario( idUsuario, idRol, correoUsuario, password, nombreUsuario, estado)
    .subscribe( resp => {      
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Se registro un usuario',
        showConfirmButton: false,
        timer: 1500
      })    
    });
    

  }
}
