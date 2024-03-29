import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { Roles } from 'src/app/login/interface/login.interface';
import { SesionesService } from 'src/app/login/services/sesiones.service';
import { Usuario } from '../../login/interface/login.interface';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styles: [`

    .container {
      padding: 16px;
      margin: 10px;
    }

    span {
      text-align: center;
      display: inline-block;
      width: 100%;
    }

  `
  ]
})
export class inicioComponent implements OnInit {

  /**Este get trae la informacion del usuario almacenada en el servicio SessionesServices. */  
  get login2() {  
    return  this.usuarioService.user;
  }

  /**Se declaran variables */
  esAdmin: boolean = false;
  roles: Roles[] = []
  nombreRol: string = '';
  numeroRol: number = 0;  
  email: string ='';

  constructor(private router: Router,
              private usuarioService: SesionesService) { }


  ngOnInit(): void {    
    /** Se verifica si el usuario es administrador */   
    if(this.usuarioService.user.idRol === 1 ){
      this.esAdmin = true;
    }   
  } 

  /** Metodo que permite al usuario 
   * salir de la sesion en la que se encuentra*/
  logout() {
    localStorage.removeItem('ApiKey');
    this.router.navigateByUrl('/login')
  }

}

//#region Emergencia? xD algun codigo q deseche y que podria funcionar
/** Historial de codigo en caso de emergencias c: */
// this.usuarioService.desconeccionUsuario(this.usuarioLogin[0].correoUsuario)
    //         .subscribe(resp => {
    //           console.log(resp)
    //         })


  // usuarioLogin: Usuario[] = [];    
    // this.usuarioService.buscaUsuario(this.usuarioService.usuario.nombre)
    //         .subscribe( resp => {
    //           this.usuarioLogin = resp;
    //           this.email = this.usuarioLogin[0].correoUsuario;
             
    //         })  
//#endregion