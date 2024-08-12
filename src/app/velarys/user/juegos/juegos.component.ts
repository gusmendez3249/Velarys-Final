import { Component, OnInit } from '@angular/core';
import { JuegoService } from '../../services/juego.service';
import { Juego } from '../../models/juego.model';
import { TipoJuego } from '../../models/tipo-juego.model';

@Component({
  selector: 'app-juegos-usuario',
  templateUrl: './juegos.component.html',
  styleUrls: ['./juegos.component.css']
})
export class JuegosComponent implements OnInit {
  juegos: Juego[] = [];
  tiposJuegos: TipoJuego[] = [];
  juegoSeleccionado: Juego | null = null;
  leccionId: number = 1; // O lo que corresponda en tu aplicación

  constructor(private juegoService: JuegoService) {}

  ngOnInit(): void {
    this.obtenerJuegos();
    this.obtenerTiposJuegos();
  }

  obtenerJuegos(): void {
    this.juegoService.obtenerJuegosPorLeccionId(this.leccionId).subscribe(
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

  seleccionarJuego(juego: Juego): void {
    this.juegoSeleccionado = juego;
  }

  reiniciarJuego(): void {
    this.juegoSeleccionado = null;
  }
}
