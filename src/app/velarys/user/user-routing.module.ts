// src/app/velarys/user/user-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CursosComponent } from './cursos/cursos.component';
import { NivelesComponent } from './niveles/niveles.component';
import { LeccionesComponent } from './lecciones/lecciones.component';

const routes: Routes = [
  { path: 'cursos', component: CursosComponent },
  { path: 'niveles/:cursoId', component: NivelesComponent },
  { path: 'lecciones/:cursoId/:nivelId', component: LeccionesComponent },
  { path: '', redirectTo: '/cursos', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
