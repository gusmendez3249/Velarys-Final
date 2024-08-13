import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CursosAdmin } from './cursos/cursos.component';
import { NivelesAdmin } from './niveles/niveles.component';
import { LeccionesAdmin } from './lecciones/lecciones.component';
import { JuegosAdmin } from './juegos/juegos.component';
import { MemoramaAdmin } from './juegos/memorama/memorama.component';
import { PreguntasAdmin } from './juegos/preguntas/preguntas.component';


const routes: Routes = [
  { path: 'cursoadmin', component: CursosAdmin },
  { path: 'niveladmin/:cursoId', component: NivelesAdmin },
  { path: 'leccionesadmin/:cursoId/:nivelId', component: LeccionesAdmin },
  { path: 'juegos/:cursoId/:nivelId/:leccionId', component: JuegosAdmin },
  { path: 'memorama/:cursoId/:nivelId/:leccionId', component: MemoramaAdmin },
  { path: 'preguntas/:cursoId/:nivelId/:leccionId', component: PreguntasAdmin },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
