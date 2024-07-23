// src/app/velarys/admin/admin-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CursosAdmin } from './cursos/cursos.component';
import { NivelesAdmin } from './niveles/niveles.component';
import { LeccionesAdmin } from './lecciones/lecciones.component';
import { JuegosAdmin } from './juegos/juegos.component';

const routes: Routes = [
  { path: 'cursos', component: CursosAdmin },
  { path: 'niveles/:cursoId', component: NivelesAdmin },
  { path: 'lecciones/:cursoId/:nivelId', component: LeccionesAdmin },
  { path: 'juegos/:leccionId', component: JuegosAdmin },
  { path: '', redirectTo: '/cursos', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
