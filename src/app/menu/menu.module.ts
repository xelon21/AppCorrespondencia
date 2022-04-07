import { NgModule } from '@angular/core';
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
import { RegistrarComponent } from './pages/registrarUsuario/registrar.component';




@NgModule({
  declarations: [
    TablaCorrespondenciaComponent,
    AgregarComponent,
    ModificarComponent,
    MostrarComponent,    
    inicioComponent,
    FiltrarComponent,
    FiltroFechasComponent,
    RegistrarComponent
        
    
  ],
  imports: [
    CommonModule,
    MenuRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,  

  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ]  
})
export class MenuModule { }
