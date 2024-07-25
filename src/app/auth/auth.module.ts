import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import { InicioSecionComponent } from './inicio-secion/inicio-secion.component';
import { RegistroComponent } from './registro/registro.component';
import { CerrarSecionComponent } from './cerrar-secion/cerrar-secion.component';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [
    BienvenidaComponent,
    InicioSecionComponent,
    RegistroComponent,
    CerrarSecionComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule
  ]
})
export class AuthModule { }
