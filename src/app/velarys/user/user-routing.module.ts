// src/app/velarys/user/user-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CursosComponent } from './cursos/cursos.component';
import { NivelesComponent } from './niveles/niveles.component';
import { LeccionesComponent } from './lecciones/lecciones.component';
import { JuegosComponent } from './juegos/juegos.component';
import { PreguntasComponent } from './juegos/preguntas/preguntas.component';

const routes: Routes = [
  { path: 'cursos', component: CursosComponent },
  { path: 'niveles/:cursoId', component: NivelesComponent },
  { path: 'lecciones/:cursoId/:nivelId', component: LeccionesComponent },
  { path: 'juegos/:cursoId/:nivelId/:leccionId', component: JuegosComponent },
  { path: 'preguntasuser/:cursoId/:nivelId/:leccionId', component: PreguntasComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
