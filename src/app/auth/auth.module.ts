import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioSecionComponent } from './inicio-secion/inicio-secion.component';
import { RegistroComponent } from './registro/registro.component';



@NgModule({
  declarations: [
    InicioSecionComponent,
    RegistroComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AuthModule { }
