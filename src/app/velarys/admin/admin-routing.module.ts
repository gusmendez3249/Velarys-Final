import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CursosAdmin } from './cursos/cursos.component';
import { NivelesAdmin } from './niveles/niveles.component';
import { LeccionesAdmin } from './lecciones/lecciones.component';
import { JuegosAdmin } from './juegos/juegos.component';
import { PreguntasComponent } from './juegos/preguntas/preguntas.component'
//import { MemoramaComponent } from './memorama/memorama.component'; // Importa el componente Memorama

const routes: Routes = [
  { path: 'cursoadmin', component: CursosAdmin },
  { path: 'niveladmin/:cursoId', component: NivelesAdmin },
  { path: 'leccionesadmin/:cursoId/:nivelId', component: LeccionesAdmin },
  { path: 'juegosadmin/:cursoId/:nivelId/:leccionId', component: JuegosAdmin },
 // { path: 'memorama', component: MemoramaComponent } // Añade la ruta para el memorama
  { path: 'preguntasadmin/:cursoId/:nivelId/:leccionId', component: PreguntasComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
