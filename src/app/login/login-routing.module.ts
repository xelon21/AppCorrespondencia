import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistrarComponent } from './pages/registrar/registrar.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: LoginComponent },
      { path: 'registrar', component: RegistrarComponent}, 
      { path: '**', redirectTo: 'login'}   
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
