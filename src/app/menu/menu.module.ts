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
import { AdministracionComponent } from './pages/administracion/administracion.component';
import { estadoUsuarioPipe } from './pipe/estadoUsuario.pipe';
import { NgbDateAdapter, NgbDateNativeUTCAdapter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModificarUsuarioComponent } from './pages/modificar-usuario/modificar-usuario.component';
import { CambioPasswordComponent } from './pages/cambio-password/cambio-password.component';
import { ModificarEstadoComponent } from './pages/modificar-estado/modificar-estado.component';
import { FiltroUsuarioPipe } from './pipe/filtroUsuario.pipe';
import { FiltroCorrelativoPipe } from './pipe/filtroCorrelativo.pipe';
import { FiltroNombreComponent } from './pages/filtro-nombre/filtro-nombre.component';
import { FiltroNombrePipe } from './pipe/filtroNombre.pipe';
import { FiltrofechasComponent } from './pages/filtrofechas/filtrofechas.component';
import { PaginacionPipe } from './pipe/paginacion.pipe';
import { FiltroFechaPipe } from './pipe/filtroFecha.pipe';
import { FechaPipe } from './pipe/fecha.pipe';
import { ObjToArrayPipe } from './pipe/objToArray.pipe';




@NgModule({
  declarations: [
  
    AgregarComponent,
    ModificarComponent,
    MostrarComponent,    
    inicioComponent,
    FiltrarComponent,
    AdministracionComponent,
    estadoUsuarioPipe,
    FiltroCorrelativoPipe,
    FiltroUsuarioPipe,
    FiltroNombrePipe,
    ModificarUsuarioComponent,
    CambioPasswordComponent,
    ModificarEstadoComponent,
    FiltroNombreComponent,
    FiltrofechasComponent,
    PaginacionPipe,
    FiltroFechaPipe,
    FechaPipe,
    ObjToArrayPipe
            
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
   // {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
    {provide: NgbDateAdapter, useClass: NgbDateNativeUTCAdapter},    
  ]  
})
export class MenuModule { }
