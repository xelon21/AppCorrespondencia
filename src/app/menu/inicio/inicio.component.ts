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

  get usuario() {     
    return  this.usuarioService.usuario;
  }
  esAdmin: boolean = false;
  roles: Roles[] = []
  nombreRol: string = '';
  numeroRol: number = 0; 
  usuarioLogin: Usuario[] = [];
  email: string ='';


  constructor(private router: Router,
              private usuarioService: SesionesService) { }


  ngOnInit(): void {

    this.traeRolUsuario();

    if(this.usuarioService.usuario.idRol === 1 ){
      this.esAdmin = true;
    }
    this.usuarioService.buscaUsuario(this.usuarioService.usuario.nombre)
            .subscribe( resp => {
              this.usuarioLogin = resp;
              this.email = this.usuarioLogin[0].correoUsuario;
             
            })  
    
  }
 

  logout() {    
   
        
    this.usuarioService.desconeccionUsuario(this.usuarioLogin[0].correoUsuario)
            .subscribe(resp => {
              console.log(resp)
            })
    this.router.navigateByUrl('/login')

  }

  traeRolUsuario() {

      

  }

}
