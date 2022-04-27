import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { registerLocaleData } from "@angular/common";
import localeDe from "@angular/common/locales/es-CL";
import localeDeExtra from "@angular/common/locales/extra/es-CL";
import { ModificarUsuarioComponent } from './menu/pages/modificar-usuario/modificar-usuario.component';
import { AdministracionComponent } from './menu/pages/administracion/administracion.component';

registerLocaleData(localeDe, "es-CL", localeDeExtra);


@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    NgbModule
    
  ],
  exports: [
    // ModificarUsuarioComponent,
    // AdministracionComponent
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "es-CL"}]
    ,
  bootstrap: [
    AppComponent,
    ModificarUsuarioComponent,
    AdministracionComponent]
})
export class AppModule { }
