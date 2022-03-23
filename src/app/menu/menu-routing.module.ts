import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarComponent } from './pages/agregar/agregar.component';
import { inicioComponent } from './inicio/inicio.component';
import { ModificarComponent } from './pages/modificar/modificar.component';
import { MostrarComponent } from './pages/mostrar/mostrar.component';
import { FiltrarComponent } from './pages/filtrar/filtrar.component';

const routes: Routes = [
  {
    path: '',
    component: inicioComponent,
    children: [
      { path: 'mostrar', component: MostrarComponent },
      { path: 'agregar', component: AgregarComponent },
      { path: 'modificar/:correlativo', component: ModificarComponent },
      { path: 'filtrar/:correlativo', component: FiltrarComponent },
      { path: '**', redirectTo: 'mostrar'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }