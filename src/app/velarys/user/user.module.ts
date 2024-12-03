// src/app/velarys/user/user.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { CursosComponent } from './cursos/cursos.component';
import { NivelesComponent } from './niveles/niveles.component';
import { LeccionesComponent } from './lecciones/lecciones.component';
import { JuegosComponent } from './juegos/juegos.component';
import { PreguntasComponent } from './juegos/preguntas/preguntas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MapComponent } from '../../map/map.component';
import { CountryListComponent } from './country-list/country-list.component';
@NgModule({
  declarations: [
    CursosComponent,
    NivelesComponent,
    LeccionesComponent,
    JuegosComponent,
    PreguntasComponent,
    MapComponent,
    CountryListComponent,
  ],

  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class UserModule { }
