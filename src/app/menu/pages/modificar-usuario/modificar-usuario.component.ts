import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Roles, UsuarioModificar, ModUsuario, IDRolNavigation } from '../../../login/interface/login.interface';
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

/**Se Declaran las variables a utilizar  */
  roles!: IDRolNavigation[];
  rolUsuario!: string;
  respuesta!: boolean;
  modUsuario: ModUsuario ={
    IdUsuario: 0,
    IdRol: 0,
    CorreoUsuario: '',
    NombreUsuario: '',
  }

  usuarioMod: UsuarioModificar = {
    IdUsuario: 0,
    IdRol: 0,
    CorreoUsuario: '',
    Password: '',
    Password2: '',   
    NombreUsuario: '',
    DesactivacionUsuario: '',
    Estado: false
  }

  /**Se declaran las clases a utilizar */
  constructor( private loginService: SesionesService,
               private activatedRouter: ActivatedRoute,
               private router: Router,
               public dialog: MatDialog) { }

  /**Se inicializan los metodos al cargar la pagina */
  ngOnInit(): void {
  
    this.activatedRouter.params
       .pipe(
         switchMap( ({ idUsuario }) => this.loginService.filtrarIdUsuario(idUsuario))
       )
       .subscribe( usuario => {
        this.modUsuario = usuario
        this.usuarioMod = this.modUsuario;
    })
       this.loginService.traeRoles()
       .subscribe( datos => {
        this.roles = datos;
      }) 
  }

  /**Metodo que permite abrir el dialog de cambio de contraseña */
  openDialog() {
    const dialogRef = this.dialog.open(CambioPasswordComponent, {
      data: {
        IdUsuario: this.usuarioMod.IdUsuario
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
/**Metodo que permite abrir el dialogo de modificar el estado del usuario */
  openDialog2() {
    const dialogRef = this.dialog.open(ModificarEstadoComponent, {
      data: {
        IdUsuario: this.usuarioMod.IdUsuario
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

/** Metodo que Permite modificar a usuario por su id */
async modificar() {   

  /**El siguiente metodo Permite Modificar a un usuario por su ID, Para ello, se extraen los datos 
   * Del formulario
   */
  const { IdRol, IdUsuario, NombreUsuario, CorreoUsuario } = this.modUsuario
    try {      
      /**Una vez obtenido los datos, se envian por parametros al metodo modificarPorIdUsuario para su modificacion */ 
      await this.loginService.modificarPorIdUsuario(IdRol, NombreUsuario, CorreoUsuario, IdUsuario)
          .subscribe( datos => {
            //console.log(datos)
            this.usuarioMod = datos                                 
                  Swal.fire({
                    title: 'Estas seguro de guardar los datos?',                  
                    showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonText: 'Guardar',
                    denyButtonText: `No Guardar`,
                  }).then((result) => {                   
                    if (result.isConfirmed) {
                      if(this.usuarioMod.IdRol === 2){
                        this.rolUsuario = 'Usuario';
                      }else {
                        this.rolUsuario = 'Administrador'
                      }                      
                      Swal.fire(` Los  datos han sido almacenados                        
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
