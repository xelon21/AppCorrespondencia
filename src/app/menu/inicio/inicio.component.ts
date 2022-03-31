import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Roles } from 'src/app/login/interface/login.interface';
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
export class inicioComponent implements OnInit {

  get usuario() {     
    return  this.usuarioService.usuario;
  }

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

    // this.usuarioService.traeRoles()
    //     .subscribe(
    //         roles => {          
    //         this.roles = roles;
    //         console.log('1',this.roles)
    //         console.log('bonus', this.usuario)
    //         this.numeroRol = this.usuario.idRol;  
    //         console.log('2',this.numeroRol)        
    //         if(this.numeroRol === this.roles[0].idRol){
    //           console.log('3',this.roles[0].idRol)            
    //           this.nombreRol = this.roles[0].rol;
    //           console.log('4', this.nombreRol)
    //         }         
    //       } 
    //     )
        // .pipe(
        //   tap( roles => {           
        //    console.log(roles)

        //   }))

  }

}
