import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './inicio/inicio.component';
import { CursoComponent } from './curso/curso.component';
import { NivelesComponent } from './niveles/niveles.component';



@NgModule({
  declarations: [
    InicioComponent,
    CursoComponent,
    NivelesComponent
  ],
  imports: [
    CommonModule
  ]
})
export class VelarysModule { }
