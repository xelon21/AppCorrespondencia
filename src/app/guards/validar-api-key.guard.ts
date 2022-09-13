import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { SesionesService } from '../login/services/sesiones.service';


/** ESTE CODIGO PERMITE QUE SOLO LOS USUARIOS ADMINISTRADORES 
 * QUE SE VALIDEN CON JWT PUEDAN INGRESAR A LA APLICACION Y A LA OPCION DE ADMINISTRACION*/

@Injectable({
  providedIn: 'root'
})
export class ValidarApiKeyGuard implements CanActivate, CanLoad {

  constructor( private usuarioService: SesionesService,
               private router: Router) {}

  canActivate(): Observable<boolean> | boolean { 

    // var dato = this.usuarioService.user!.correoUsuario
    // if(!dato  || dato  == "no"){
    //   this.router.navigateByUrl('/login')
    //   return false;
    // }
    return true;
    
    // var hed = new HttpHeaders()
    // .set('x-api-key', localStorage.getItem('ApiKey') || '')
    // if(!hed){
    //   this.router.navigateByUrl('/login') 
    //   return false;     
    // }
    // return true;
    // return this.usuarioService.validaApiKey()
    //         .pipe( 
    //           tap( valid => {
    //             if(!valid) {
    //               this.router.navigateByUrl('/login')
    //             } 
    //           })
    //         );
  }
  canLoad(): Observable<boolean> | boolean { 
    // console.log(this.usuarioService.user!.correoUsuario)
    // var dato = this.usuarioService.user!.correoUsuario || 1
    // if(!dato  || dato  == "no"){      
    //   this.router.navigateByUrl('/login')
    //   return false;
    // }   
    return true;
    // var headers = new HttpHeaders()
    // .set('x-api-key', localStorage.getItem('ApiKey') || '')
    // if(!headers){
    //   this.router.navigateByUrl('/login')
    //   return false;      
    // }
    // return true;
    // return this.usuarioService.validaApiKey()
    //           .pipe( 
    //             tap( valid => {
    //               if(!valid) {
    //                 this.router.navigateByUrl('/login')
    //               }
    //             })
    //           );
  }
}
