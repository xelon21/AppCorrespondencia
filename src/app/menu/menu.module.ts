import { NgModule,LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { AgregarComponent } from './pages/agregar/agregar.component';
import { ModificarComponent } from './pages/modificar/modificar.component';
import { MostrarComponent } from './pages/mostrar/mostrar.component';
import { inicioComponent } from './inicio/inicio.component';
import { MaterialModule } from '../material/material.module';
import { FiltrarComponent } from './pages/filtrar/filtrar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { FiltroFechasComponent } from './filtro-fechas/filtro-fechas.component';
import { TablaCorrespondenciaComponent } from './tablaCorrespondencia/tablaCorrespondencia.component';
import { AdministracionComponent } from './pages/administracion/administracion.component';
import { estadoUsuarioPipe } from './pipe/estadoUsuario.pipe';
import { NgbDateAdapter, NgbDateNativeUTCAdapter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModificarUsuarioComponent } from './pages/modificar-usuario/modificar-usuario.component';
import { CambioPasswordComponent } from './pages/cambio-password/cambio-password.component';
import { ModificarEstadoComponent } from './pages/modificar-estado/modificar-estado.component';
import { FiltroUsuarioPipe } from './pipe/filtroUsuario.pipe';
import { FiltroBusquedaComponent } from './pages/filtro-busqueda/filtro-busqueda.component';
import { FiltroCorrelativoPipe } from './pipe/filtroCorrelativo.pipe';
import { FiltroNombreComponent } from './pages/filtro-nombre/filtro-nombre.component';
import { FiltroNombrePipe } from './pipe/filtroNombre.pipe';




@NgModule({
  declarations: [
    TablaCorrespondenciaComponent,
    AgregarComponent,
    ModificarComponent,
    MostrarComponent,    
    inicioComponent,
    FiltrarComponent,
    FiltroFechasComponent,    
    AdministracionComponent,
    estadoUsuarioPipe,
    FiltroCorrelativoPipe,
    FiltroUsuarioPipe,
    FiltroNombrePipe,
    ModificarUsuarioComponent,
    CambioPasswordComponent,
    ModificarEstadoComponent,
    FiltroBusquedaComponent,
    FiltroNombreComponent,
            
  ],
  imports: [
    CommonModule,
    MenuRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,  
    NgbModule

  ],  
  providers: [
    AgregarComponent,
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
    {provide: NgbDateAdapter, useClass: NgbDateNativeUTCAdapter},    
  ]  
})
export class MenuModule { }
