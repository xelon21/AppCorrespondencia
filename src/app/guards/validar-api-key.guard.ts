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
    return this.usuarioService.validaApiKey()
            .pipe( 
              tap( valid => {
                if(!valid) {                  
                  this.router.navigateByUrl('/login')
                } 
              })
            );
  }
  canLoad(): Observable<boolean> | boolean {
    return this.usuarioService.validaApiKey()
              .pipe( 
                tap( valid => {
                  if(!valid) {                   
                    this.router.navigateByUrl('/login')
                  }
                })
              );
  }
}
