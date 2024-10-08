import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CursosAdmin } from './cursos/cursos.component';
import { NivelesAdmin } from './niveles/niveles.component';
import { LeccionesAdmin } from './lecciones/lecciones.component';
import { JuegosAdmin } from './juegos/juegos.component';
import { PreguntasAdmin } from './juegos/preguntas/preguntas.component';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';


const routes: Routes = [
  { path: 'cursoadmin', component: CursosAdmin },
  { path: 'niveladmin/:cursoId', component: NivelesAdmin },
  { path: 'leccionesadmin/:cursoId/:nivelId', component: LeccionesAdmin },
  { path: 'juegosadmin/:cursoId/:nivelId/:leccionId', component: JuegosAdmin },
  { path: 'preguntas/:cursoId/:nivelId/:leccionId', component: PreguntasAdmin },
  { path: 'bienvenidaadmin', component: BienvenidaComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
