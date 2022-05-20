import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarComponent } from './pages/agregar/agregar.component';
import { inicioComponent } from './inicio/inicio.component';
import { ModificarComponent } from './pages/modificar/modificar.component';
import { MostrarComponent } from './pages/mostrar/mostrar.component';
import { FiltrarComponent } from './pages/filtrar/filtrar.component';
import { AdministracionComponent } from './pages/administracion/administracion.component';
import { ValidaAdminGuard } from '../guards/valida-admin.guard';
import { ModificarUsuarioComponent } from './pages/modificar-usuario/modificar-usuario.component';
import { FiltroNombreComponent } from './pages/filtro-nombre/filtro-nombre.component';

// Se definen las rutas hijas a ocupar
const routes: Routes = [
  {
    path: '',
    component: inicioComponent,
    children: [
      { path: 'mostrar', component: MostrarComponent },
      { path: 'agregar', component: AgregarComponent },    
      { path: 'modificar/:correlativo', component: ModificarComponent },      
      { path: 'filtrar', component: FiltrarComponent },
      { path: 'filtroNombre', component: FiltroNombreComponent},     
      { path: 'administrador', component: AdministracionComponent, 
        canActivate: [ ValidaAdminGuard ],
        canLoad: [ ValidaAdminGuard ] 
      },  
      { path: 'modificarUsuario/:idUsuario', component: ModificarUsuarioComponent, 
        canActivate: [ ValidaAdminGuard ],
        canLoad: [ ValidaAdminGuard ] 
      }, 
      { path: '**', redirectTo: 'agregar'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
