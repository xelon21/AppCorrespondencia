import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { SliderComponent } from './slider/slider.component';
import { AgregarComponent } from './pages/agregar/agregar.component';
import { ModificarComponent } from './pages/modificar/modificar.component';
import { MostrarComponent } from './pages/mostrar/mostrar.component';
import { inicioComponent } from './inicio/inicio.component';
import { MaterialModule } from '../material/material.module';
import { FiltrarComponent } from './pages/filtrar/filtrar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SliderComponent,
    AgregarComponent,
    ModificarComponent,
    MostrarComponent,    
    inicioComponent,
    FiltrarComponent,
        
    
  ],
  imports: [
    CommonModule,
    MenuRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,    
    

  ]  
})
export class MenuModule { }
