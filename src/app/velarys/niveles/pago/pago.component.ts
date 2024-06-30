import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NivelesService } from '../niveles.service';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit {
  nivelId: number = 0;  // Inicializa a 0 o un valor predeterminado
  nombre: string = '';
  email: string = '';
  tarjeta: string = '';
  fechaExpiracion: string = '';
  cvv: string = '';

  constructor(private route: ActivatedRoute, private nivelesService: NivelesService, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.nivelId = +params['id'];  // Obtén el ID del nivel de los parámetros de la ruta
    });
  }

  volver(): void {
    this.router.navigate(['/curso']);  // Redirige al curso
  }

  cerrarSesion(): void {
    // Implementar la lógica de cierre de sesión aquí
    console.log('Cerrar sesión');
  }

  realizarPago(): void {
    // Aquí podrías realizar una llamada al servidor para procesar el pago
    if (confirm('¿Estás seguro de que deseas realizar el pago?')) {
      this.nivelesService.actualizarAcceso(this.nivelId);
      this.router.navigate([`/nivel/${this.nivelId}`]);  // Redirige al nivel una vez pagado
    }
  }
}
