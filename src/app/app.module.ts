import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';  // Importa FormsModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Nivel1Component } from './velarys/niveles/nivel1/nivel1.component';
import { CursoComponent } from './velarys/curso/curso.component';
import { Nivel2Component } from './velarys/niveles/nivel2/nivel2.component';
import { Nivel3Component } from './velarys/niveles/nivel3/nivel3.component';
import { PagoComponent } from './velarys/niveles/pago/pago.component';


@NgModule({
  declarations: [
    AppComponent,
    CursoComponent,
    Nivel1Component,
    Nivel2Component,
    Nivel3Component,
    PagoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule  // Agrega FormsModule aquí
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
