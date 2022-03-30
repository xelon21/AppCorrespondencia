import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SesionesService } from 'src/app/login/services/sesiones.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styles: [`

    .container {
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
export class inicioComponent {

  get usuario() {    
    return  this.usuarioService.usuario;
  }

  constructor(private router: Router,
              private usuarioService: SesionesService) { }

 

  logout() {

    this.router.navigateByUrl('/login')
    this.usuarioService.logout();
  }
}
