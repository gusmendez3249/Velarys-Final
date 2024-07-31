import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  user = {
    nombres: '',
    apellidos: '',
    correo: '',
    edad: 0,
    sexo: '',
    contrasena: '',
    confirmarContrasena: ''
  };

  mensaje: string = ''; // Variable para mensajes de error o éxito

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (this.validateInputs()) {
      this.authService.register(this.user.nombres, this.user.apellidos, this.user.correo, this.user.edad, this.user.sexo, this.user.contrasena).subscribe({
        next: () => {
          this.mensaje = 'Registro exitoso. Redirigiendo...';
          setTimeout(() => this.router.navigate(['/inicio']), 2000); // Redirige después de 2 segundos
        },
        error: (err) => {
          this.mensaje = 'Error en el registro: ' + (err.error.message || 'Ocurrió un error inesperado');
        }
      });
    } else {
      this.mensaje = 'Por favor, complete todos los campos correctamente.';
    }
  }

  onVolver() {
    this.router.navigate(['/inicio']);
  }

  validateInputs(): boolean {
    const { nombres, apellidos, correo, edad, sexo, contrasena, confirmarContrasena } = this.user;
    return nombres.trim() !== '' &&
           apellidos.trim() !== '' &&
           this.validateEmail(correo) &&
           edad > 0 &&
           sexo.trim() !== '' &&
           contrasena.trim() !== '' &&
           contrasena === confirmarContrasena;
  }

  validateEmail(email: string): boolean {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.[^<>()[\]\\.,;:\s@"]{2,}))$/i;
    return re.test(String(email).toLowerCase());
  }
}
