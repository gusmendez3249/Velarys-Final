import { AuthService } from './../auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio-secion',
  templateUrl: './inicio-secion.component.html',
  styleUrls: ['./inicio-secion.component.css'] // Corrige la propiedad de estilo
})
export class InicioSecionComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ingresar(): void {
    this.authService.login(this.email, this.password).subscribe(
      (response: any) => {
        if (response.role === 'admin') {
          this.router.navigate(['/cursoadmin']); // Redirige al panel de administración
        } else {
          this.router.navigate(['/user/cursos']); // Redirige al panel de usuario
        }
      },
      (error) => {
        console.error('Error al iniciar sesión:', error);
        // Puedes agregar un mensaje de error para el usuario aquí
      }
    );
  }

  volver(): void {
    this.router.navigate(['/bienvenida']);
  }
}
