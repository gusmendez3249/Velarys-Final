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

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (this.validateInputs()) {
      this.authService.register(this.user.nombres, this.user.apellidos, this.user.correo, this.user.edad, this.user.sexo, this.user.contrasena).subscribe({
        next: () => this.router.navigate(['/idiomas']),
        error: (err) => alert(err.error.error || 'Error en el registro'),
      });
    } else {
      alert('Por favor, complete todos los campos correctamente.');
    }
  }

  onVolver() {
    this.router.navigate(['/inicio']); // Navega a la pantalla de inicio o a donde quieras regresar
  }

  validateInputs(): boolean {
    const { nombres, apellidos, correo, edad, sexo, contrasena, confirmarContrasena } = this.user;
    return nombres.trim() !== '' &&
           apellidos.trim() !== '' &&
           this.validateEmail(correo) &&
           edad > 0 &&
           sexo.trim() !== '' &&
           contrasena.trim() !== '' &&
           contrasena === confirmarContrasena; // Validación para que la contraseña y la confirmación coincidan
  }

  validateEmail(email: string): boolean {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.[^<>()[\]\\.,;:\s@"]{2,}))$/i;
    return re.test(String(email).toLowerCase());
  }
}
