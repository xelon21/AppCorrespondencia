import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router, } from '@angular/router';
import { Observable } from 'rxjs';
import { SesionesService } from '../login/services/sesiones.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ValidaAdminGuard implements CanActivate, CanLoad {

  constructor(private usuarioService: SesionesService,
              private router: Router) {

  }
  canActivate(): Observable<boolean> | boolean {  
    return this.usuarioService.validaAdmin()
            .pipe( 
              tap( valid => {
                if(!valid) {
                  this.router.navigateByUrl('/correspondencia/administrador')
                }
              })
            );
  }
  canLoad(): Observable<boolean> | boolean {  
    return this.usuarioService.validaApiKey()
              .pipe( 
                tap( valid => {
                  if(!valid) {
                    this.router.navigateByUrl('/correspondencia/administrador')
                  }
                })
              );
  }
}
