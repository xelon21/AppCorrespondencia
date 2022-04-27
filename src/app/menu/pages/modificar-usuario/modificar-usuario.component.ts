import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Roles, UsuarioModificar } from '../../../login/interface/login.interface';
import { SesionesService } from '../../../login/services/sesiones.service';
import { CambioPasswordComponent } from '../cambio-password/cambio-password.component';
import { ModificarEstadoComponent } from '../modificar-estado/modificar-estado.component';




@Component({
  selector: 'app-modificar-usuario',
  templateUrl: './modificar-usuario.component.html',
  styles: [`
*{
  
    padding: 0;
    margin: 0;
    }

    .boto {
      width: 80%;
    }
    html, body, section {
        height: 100%;
        min-height: 100%;
    }
    body{
        background-color: lightgray;
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

    .salto {
      margin-top: 10px;
    }
  `
  ]
  
})
export class ModificarUsuarioComponent implements OnInit {


  roles!: Roles[];
  rolUsuario!: string;
  respuesta!: boolean;

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
               private activatedRouter: ActivatedRoute,
               private router: Router,
               public dialog: MatDialog) { }

  ngOnInit(): void {

    this.activatedRouter.params
       .pipe(
         switchMap( ({ idUsuario }) => this.loginService.buscarPorIdUsuario(idUsuario) )
       )
       .subscribe( usuario => {       
         this.usuario = usuario   
        //  if(this.usuario.estado){
        //   this.activoInactivo = 'Usuario Activado';
          
        // }else {
        //   this.activoInactivo = 'Usuario Desactivado';
        // }  
       })
       this.loginService.traeRoles()
       .subscribe( datos => {
        this.roles = datos;
      })
 
      

  }

  openDialog() {
    const dialogRef = this.dialog.open(CambioPasswordComponent, {
      data: {
        idUsuario: this.usuario.idUsuario
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialog2() {
    const dialogRef = this.dialog.open(ModificarEstadoComponent, {
      data: {
        idUsuario: this.usuario.idUsuario
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }



  async modificar() {   

    try {      
      await this.loginService.modificarPorIdUsuario(this.usuario)
          .subscribe( datos => {
            this.usuario = datos                                 
                  Swal.fire({
                    title: 'Estas seguro de guardar los datos?',                  
                    showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonText: 'Guardar',
                    denyButtonText: `No Guardar`,
                  }).then((result) => {                   
                    if (result.isConfirmed) {
                      if(this.usuario.idRol === 2){
                        this.rolUsuario = 'Usuario';
                      }else {
                        this.rolUsuario = 'Administrador'
                      }                      
                      Swal.fire(` Los siguientes datos:                           
                                  Email: ${ this.usuario.correoUsuario }   
                                  Usuario: ${ this.usuario.nombreUsuario } 
                                  Rol: ${ this.rolUsuario }   
                                  han sido almacenados                        
                      `)                       
                      this.router.navigate(['/correspondencia/administrador'])             
                    } else if (result.isDenied) {
                      Swal.fire('Los datos ingresados no se han guardado, Corrobore los datos nuevamente')
                      this.router.navigate(['/correspondencia/administrador'])
                    }                  
                  })
              })    
      
    } catch (error) {
      console.log(error)
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al ingresar los datos',
       
      })
    }

 }
}
