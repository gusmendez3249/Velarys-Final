// src/app/velarys/admin/admin-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CursosAdmin } from './cursos/cursos.component';
import { NivelesAdmin } from './niveles/niveles.component';
import { LeccionesAdmin } from './lecciones/lecciones.component';
import { JuegosAdmin } from './juegos/juegos.component';

const routes: Routes = [
  { path: 'cursoadmin', component: CursosAdmin },
  { path: 'niveladmin/:cursoId', component: NivelesAdmin },
  { path: 'leccionesadmin/:cursoId/:nivelId', component: LeccionesAdmin },
  { path: 'juegosadmin/:cursoId/:nivelId/:leccionId', component: JuegosAdmin },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
