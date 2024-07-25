import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import { InicioSecionComponent } from './inicio-secion/inicio-secion.component';
import { RegistroComponent } from './registro/registro.component';
import { CerrarSecionComponent } from './cerrar-secion/cerrar-secion.component';

const routes: Routes = [
  { path: 'bienvenida', component: BienvenidaComponent },
  { path: 'inicio', component: InicioSecionComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'cerrar', component: CerrarSecionComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
