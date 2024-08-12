import { Component, OnInit } from '@angular/core';
import { JuegoService } from '../../../services/juego.service';
import { Memorama, Carta } from '../../../models/juego.model';

@Component({
  selector: 'app-memorama',
  templateUrl: './memorama.component.html',
  styleUrls: ['./memorama.component.css']
})
export class MemoramaComponent implements OnInit {
  memoramaSeleccionado: Memorama | null = null;
  cartasAbiertas: Carta[] = [];
  movimientos: number = 0;

  constructor(private juegoService: JuegoService) {}

  ngOnInit(): void {
    this.obtenerMemorama();
  }

  obtenerMemorama(): void {
    this.juegoService.obtenerMemoramas().subscribe(
      (data) => {
        if (data.length > 0) {
          this.memoramaSeleccionado = data[0];  // Selecciona el primer memorama como ejemplo
          this.memoramaSeleccionado.cartas = this.shuffleArray(this.memoramaSeleccionado.cartas);
        }
      },
      (error) => console.error('Error al obtener memoramas', error)
    );
  }

  seleccionarCarta(carta: Carta): void {
    if (carta.estado !== 'cerrado' || this.cartasAbiertas.length === 2) {
      return;
    }

    carta.estado = 'abierto';
    this.cartasAbiertas.push(carta);

    if (this.cartasAbiertas.length === 2) {
      this.movimientos++;
      setTimeout(() => {
        this.verificarCartas();
      }, 1000);
    }
  }

  verificarCartas(): void {
    const [carta1, carta2] = this.cartasAbiertas;

    if (carta1.valor === carta2.valor) {
      carta1.estado = 'completado';
      carta2.estado = 'completado';
    } else {
      carta1.estado = 'cerrado';
      carta2.estado = 'cerrado';
    }

    this.cartasAbiertas = [];

    if (this.juegoCompletado()) {
      alert(`¡Felicitaciones! Has completado el memorama en ${this.movimientos} movimientos.`);
      this.reiniciarJuego();
    }
  }

  juegoCompletado(): boolean {
    return this.memoramaSeleccionado?.cartas.every(carta => carta.estado === 'completado') || false;
  }

  reiniciarJuego(): void {
    if (this.memoramaSeleccionado) {
      this.cartasAbiertas = [];
      this.movimientos = 0;
      this.memoramaSeleccionado.cartas = this.shuffleArray(this.memoramaSeleccionado.cartas);
    }
  }

  shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
