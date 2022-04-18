import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { Roles } from 'src/app/login/interface/login.interface';
import { SesionesService } from 'src/app/login/services/sesiones.service';

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
  esAdmin: boolean = true;
  roles: Roles[] = []
  nombreRol: string = '';
  numeroRol: number = 0; 


  constructor(private router: Router,
              private usuarioService: SesionesService) { }


  ngOnInit(): void {

    this.traeRolUsuario();
        
    
  }
 

  logout() {    
    
    this.router.navigateByUrl('/login')
    this.usuarioService.logout();

  }

  traeRolUsuario() {

    
    // this.usuarioService.validaAdmin()
    //     .subscribe( resp => this.esAdmin = resp )
            

  }

}
