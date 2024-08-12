import { Component, OnInit } from '@angular/core';
import { JuegoService } from '../../services/juego.service';
import { Juego } from '../../models/juego.model';
import { TipoJuego } from '../../models/tipo-juego.model';

@Component({
  selector: 'app-juegos-admin',
  templateUrl: './juegos.component.html',
  styleUrls: ['./juegos.component.css']
})
export class JuegosAdmin implements OnInit {
  juegos: Juego[] = [];
  tiposJuegos: TipoJuego[] = [];
  nuevoJuego: Juego = { leccionId: 1, tipo: '', contenido: '' };
  nuevoTipoJuego: TipoJuego = { nombre: '' };

  constructor(private juegoService: JuegoService) {}

  ngOnInit(): void {
    this.obtenerJuegos();
    this.obtenerTiposJuegos();
  }

  obtenerJuegos(): void {
    this.juegoService.obtenerJuegosPorLeccionId(1).subscribe(
      (data) => this.juegos = data,
      (error) => console.error('Error al obtener juegos', error)
    );
  }

  obtenerTiposJuegos(): void {
    this.juegoService.obtenerTiposJuegos().subscribe(
      (data) => this.tiposJuegos = data,
      (error) => console.error('Error al obtener tipos de juegos', error)
    );
  }

  crearJuego(): void {
    this.juegoService.crearJuego(this.nuevoJuego).subscribe(
      () => {
        this.obtenerJuegos();
        this.nuevoJuego = { leccionId: 1, tipo: '', contenido: '' };
      },
      (error) => console.error('Error al crear juego', error)
    );
  }

  crearTipoJuego(): void {
    this.juegoService.crearTipoJuego(this.nuevoTipoJuego).subscribe(
      (data) => {
        this.tiposJuegos.push(data);
        this.nuevoTipoJuego = { nombre: '' };
        alert('Tipo de juego creado exitosamente');
      },
      (error) => console.error('Error al crear tipo de juego', error)
    );
  }

  eliminarTipoJuego(id: number): void {
    this.juegoService.eliminarTipoJuego(id).subscribe(
      () => {
        this.tiposJuegos = this.tiposJuegos.filter(t => t.id !== id);
        alert('Tipo de juego eliminado exitosamente');
      },
      (error) => console.error('Error al eliminar tipo de juego', error)
    );
  }

  guardarCambios(juego: Juego): void {
    this.juegoService.actualizarJuego(juego.id!, juego).subscribe(
      () => this.obtenerJuegos(),
      (error) => console.error('Error al actualizar juego', error)
    );
  }

  eliminarJuego(id: number): void {
    this.juegoService.eliminarJuego(id).subscribe(
      () => this.obtenerJuegos(),
      (error) => console.error('Error al eliminar juego', error)
    );
  }
}
