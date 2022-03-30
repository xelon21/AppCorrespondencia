import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidarApiKeyGuard } from './guards/validar-api-key.guard';
import { ErrorPageComponent } from './shared/error-page/error-page.component';

// Se definen las rutas padres a ocupar
const routes: Routes = [
  {
    path: 'correspondencia',
    loadChildren: () => import('./menu/menu.module').then( m => m.MenuModule),
    canActivate: [ ValidarApiKeyGuard ],
    canLoad: [ ValidarApiKeyGuard ]
  },
  {
    path: '404',
    component: ErrorPageComponent
  },
  {
    path:'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginModule)
  },
  {
    path: '**',
    redirectTo: 'login'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
