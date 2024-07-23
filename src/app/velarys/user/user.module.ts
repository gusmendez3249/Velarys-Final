// src/app/velarys/user/user.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { CursosComponent } from './cursos/cursos.component';
import { NivelesComponent } from './niveles/niveles.component';
import { LeccionesComponent } from './lecciones/lecciones.component';

@NgModule({
  declarations: [
    CursosComponent,
    NivelesComponent,
    LeccionesComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
