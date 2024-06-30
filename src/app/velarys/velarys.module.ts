import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './inicio/inicio.component';
import { CursoComponent } from './curso/curso.component';
import { NivelesComponent } from './niveles/niveles.component';
import { NavbarComponent } from './velarys/navbar/navbar.component';
import { NivelComponent } from './niveles/nivel/nivel.component';



@NgModule({
  declarations: [
    InicioComponent,
    CursoComponent,
    NivelesComponent,
    NavbarComponent,
    NivelComponent
  ],
  imports: [
    CommonModule
  ]
})
export class VelarysModule { }
