import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Asegúrate de importar FormsModule y ReactiveFormsModule
import { AdminRoutingModule } from './admin-routing.module';
import { CursosAdmin } from './cursos/cursos.component';
import { NivelesAdmin } from './niveles/niveles.component';
import { LeccionesAdmin } from './lecciones/lecciones.component';
import { JuegosAdmin } from './juegos/juegos.component';
import { MemoramaAdmin } from './juegos/memorama/memorama.component';
import { PreguntasAdmin } from './juegos/preguntas/preguntas.component';

@NgModule({
  declarations: [
    CursosAdmin,
    NivelesAdmin,
    LeccionesAdmin,
    JuegosAdmin,
    MemoramaAdmin,
    PreguntasAdmin,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
