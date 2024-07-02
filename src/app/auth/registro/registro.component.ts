import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  user = {
    nombres: '',
    correo: '',
    contrasena: ''
  };

  constructor(private router: Router) {}

  onSubmit() {
    if (this.validateInputs()) {
      this.router.navigate(['/curso']);
    } else {
      alert('Por favor, complete todos los campos correctamente.');
    }
  }

  onVolver() {
    this.router.navigate(['/inicio']); // Navega a la pantalla de inicio o a donde quieras regresar
  }

  validateInputs(): boolean {
    const { nombres, correo, contrasena } = this.user;
    return nombres.trim() !== '' && this.validateEmail(correo) && contrasena.trim() !== '';
  }

  validateEmail(email: string): boolean {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.[^<>()[\]\\.,;:\s@"]{2,}))$/i;
    return re.test(String(email).toLowerCase());
  }
}
