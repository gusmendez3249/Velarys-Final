import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { IpService } from '../../ip.service';

@Component({
  selector: 'app-inicio-secion',
  templateUrl: './inicio-secion.component.html',
  styleUrls: ['./inicio-secion.component.css']
})
export class InicioSecionComponent implements OnInit {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  ipInfo: any;
  showIpInfo: boolean = false; // Variable para controlar la visibilidad del cuadro de IP

  constructor(private authService: AuthService, private router: Router, private ipService: IpService) {}

  ngOnInit() {
    this.ipService.getIpInfo().subscribe(
      data => {
        this.ipInfo = data;
      },
      error => {
        console.error('Error fetching IP info:', error);
      }
    );
  }

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

  // Nueva función para alternar la visibilidad del cuadro de información de IP
  toggleIpInfo(): void {
    this.showIpInfo = !this.showIpInfo; // Cambia el estado de la visibilidad
  }
}
