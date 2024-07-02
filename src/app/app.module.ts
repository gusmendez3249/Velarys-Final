import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  // Importa FormsModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Nivel1Component } from './velarys/niveles/nivel1/nivel1.component';
import { CursoComponent } from './velarys/curso/curso.component';
import { Nivel2Component } from './velarys/niveles/nivel2/nivel2.component';
import { Nivel3Component } from './velarys/niveles/nivel3/nivel3.component';
import { PagoComponent } from './velarys/niveles/pago/pago.component';
import { AdminComponent } from './velarys/admin/admin.component';
import { PreguntasComponent } from './velarys/curso/ejercicios/preguntas/preguntas.component';
import { BienvenidaComponent } from './auth/bienvenida/bienvenida.component';
import { InicioSecionComponent } from './auth/inicio-secion/inicio-secion.component';
import { RegistroComponent } from './auth/registro/registro.component';


@NgModule({
  declarations: [
    AppComponent,
    CursoComponent,
    Nivel1Component,
    Nivel2Component,
    Nivel3Component,
    PagoComponent,
    AdminComponent,
    PreguntasComponent,
    BienvenidaComponent,
    InicioSecionComponent,
    RegistroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,  // Agrega FormsModule aquí
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
