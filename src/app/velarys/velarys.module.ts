import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './inicio/inicio.component';
import { CursoComponent } from './curso/curso.component';
<<<<<<< HEAD
=======

>>>>>>> gustavo
import { Nivel1Component } from './niveles/nivel1/nivel1.component';
import { Nivel2Component } from './niveles/nivel2/nivel2.component';
import { Nivel3Component } from './niveles/nivel3/nivel3.component';
import { PagoComponent } from './niveles/pago/pago.component';
import { AdminComponent } from './admin/admin.component';
import { PreguntasComponent } from './curso/ejercicios/preguntas/preguntas.component';



@NgModule({
  declarations: [
    InicioComponent,
    CursoComponent,
    Nivel1Component,
    Nivel2Component,
    Nivel3Component,
    PagoComponent,
    AdminComponent,
    PreguntasComponent
  ],
  imports: [
    CommonModule
  ]
})
export class VelarysModule { }
