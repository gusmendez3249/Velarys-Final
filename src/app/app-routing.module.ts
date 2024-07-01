import { CursoComponent } from './velarys/curso/curso.component';
// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Nivel1Component } from './velarys/niveles/nivel1/nivel1.component';
import { Nivel2Component } from './velarys/niveles/nivel2/nivel2.component';
import { Nivel3Component } from './velarys/niveles/nivel3/nivel3.component';
import { PagoComponent } from './velarys/niveles/pago/pago.component';
import { AdminComponent } from './velarys/admin/admin.component';

const routes: Routes = [
  { path: 'curso', component: CursoComponent },
  { path: 'nivel/1', component: Nivel1Component },
  { path: 'nivel/2', component: Nivel2Component },
  { path: 'nivel/3', component: Nivel3Component },
  { path: 'pago/:id', component: PagoComponent },
  { path: 'admin', component: AdminComponent },
  { path: '', redirectTo: '/curso', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
