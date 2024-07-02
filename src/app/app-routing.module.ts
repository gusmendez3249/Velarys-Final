import { CursoComponent } from './velarys/curso/curso.component';
// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Nivel1Component } from './velarys/niveles/nivel1/nivel1.component';
import { Nivel2Component } from './velarys/niveles/nivel2/nivel2.component';
import { Nivel3Component } from './velarys/niveles/nivel3/nivel3.component';
import { PagoComponent } from './velarys/niveles/pago/pago.component';
import { AdminComponent } from './velarys/admin/admin.component';
import { PreguntasComponent } from './velarys/curso/ejercicios/preguntas/preguntas.component';
import { BienvenidaComponent } from './auth/bienvenida/bienvenida.component';
import { InicioSecionComponent } from './auth/inicio-secion/inicio-secion.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { CerrarSecionComponent } from './auth/cerrar-secion/cerrar-secion.component';

const routes: Routes = [
  { path: 'curso', component: CursoComponent },
  { path: 'nivel/1', component: Nivel1Component },
  { path: 'nivel/2', component: Nivel2Component },
  { path: 'nivel/3', component: Nivel3Component },
  { path: 'pago/:id', component: PagoComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'preguntas', component: PreguntasComponent},
  { path: 'bienvenida', component: BienvenidaComponent},
  { path: 'inicio', component: InicioSecionComponent},
  { path: 'registro', component: RegistroComponent},
  { path: 'cerrar', component: CerrarSecionComponent},
  { path: '', redirectTo: '/curso', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
