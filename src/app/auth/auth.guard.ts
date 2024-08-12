import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service'; // Ajusta la ruta según tu estructura de carpetas

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    // Aquí puedes usar una lógica más compleja para verificar la autenticación
    const isAuthenticated = !!localStorage.getItem('user');
    console.log('AuthGuard canActivate:', isAuthenticated);// Suponiendo que el token de autenticación se guarda en localStorage

    if (!isAuthenticated) {
      this.router.navigate(['/bienvenida']); // Redirige a la página de bienvenida si no está autenticado
      return false;
    }

    return true;
  }
}
