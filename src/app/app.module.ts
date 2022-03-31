import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './login/pages/home/home.component';
import { LoginComponent } from './login/pages/login/login.component';
import { MaterialModule } from './material/material.module';



@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
    HomeComponent,
    LoginComponent,
    
        
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MaterialModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
