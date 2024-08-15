import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidaComponent } from './auth/bienvenida/bienvenida.component';
import { PagoComponent } from './pago/pago/pago.component';
import { AuthGuard } from './auth/auth.guard'; // Ajusta la ruta según tu estructura de carpetas



const routes: Routes = [
  { path: '', redirectTo: 'bienvenida', pathMatch: 'full' },
  { path: 'bienvenida', component: BienvenidaComponent },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./velarys/admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuard] // Protege las rutas del módulo Admin
  },
  {
    path: 'user',
    loadChildren: () => import('./velarys/user/user.module').then(m => m.UserModule),
    canActivate: [AuthGuard] // Protege las rutas del módulo User
  },
  {
    path: 'pago',
    component: PagoComponent, // Protege la ruta de Pago
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
