import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../auth.service';

@Component({
  selector: 'app-inicio-secion',
  templateUrl: './inicio-secion.component.html',
  styleUrls: ['./inicio-secion.component.css']
})
export class InicioSecionComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ingresar(): void {
    this.authService.login(this.email, this.password).subscribe(
      (response: any) => {
        if (response) {
          if (response.role === 'admin') {
            this.router.navigate(['/bienvenidaadmin']);
          } else {
            this.router.navigate(['/cursos']);
          }
        } else {
          this.errorMessage = 'Respuesta inesperada del servidor.';
        }
      },
      (error) => {
        console.error('Error al iniciar sesión:', error);
        this.errorMessage = 'Usuario o contraseña incorrectos. Inténtalo de nuevo.';
      }
    );
  }

  volver(): void {
    this.router.navigate(['/bienvenida']);
  }
}
