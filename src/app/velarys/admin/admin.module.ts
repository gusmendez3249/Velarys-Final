// src/app/velarys/admin/admin.module.ts
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { CursosAdmin } from './cursos/cursos.component';
import { NivelesAdmin } from './niveles/niveles.component';
import { LeccionesAdmin } from './lecciones/lecciones.component';
import { JuegosAdmin } from './juegos/juegos.component';


@NgModule({
  declarations: [
    CursosAdmin,
    NivelesAdmin,
    LeccionesAdmin,
    JuegosAdmin
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule
  ]
})
export class AdminModule { }
