import { Component, OnInit } from '@angular/core';
import { JuegoService } from '../../services/juego.service';
import { Juego, Memorama, Carta } from '../../models/juego.model';

@Component({
  selector: 'app-juegos',
  templateUrl: './juegos.component.html',
  styleUrls: ['./juegos.component.css']
})
export class JuegosAdmin implements OnInit {
  juegos: Juego[] = [];
  memoramas: Memorama[] = [];
  nuevoJuego: Juego = { leccionId: 1, tipo: 'preguntas', contenido: '' };
  memoramaSeleccionado: Memorama | null = null;
  cartasAbiertas: Carta[] = [];
  movimientos: number = 0;

  constructor(private juegoService: JuegoService) {}

  ngOnInit(): void {
    this.obtenerJuegos();
    this.obtenerMemoramas();
  }

  obtenerJuegos(): void {
    this.juegoService.obtenerJuegosPorLeccionId(1).subscribe(
      (data) => this.juegos = data,
      (error) => console.error('Error al obtener juegos', error)
    );
  }

  obtenerMemoramas(): void {
    this.juegoService.obtenerMemoramas().subscribe(
      (data) => this.memoramas = data,
      (error) => console.error('Error al obtener memoramas', error)
    );
  }

  crearJuego(): void {
    this.juegoService.crearJuego(this.nuevoJuego).subscribe(
      () => {
        this.obtenerJuegos();
        this.nuevoJuego = { leccionId: 1, tipo: 'preguntas', contenido: '' };
      },
      (error) => console.error('Error al crear juego', error)
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

  agregarMemorama(nombre: string): void {
    const nuevoMemorama: Memorama = {
      nombre,
      cartas: this.generarCartas()
    };

    this.juegoService.crearMemorama(nuevoMemorama).subscribe(
      (data) => {
        this.memoramas.push(data);
        alert('Memorama creado exitosamente');
      },
      (error) => console.error('Error al crear memorama', error)
    );
  }

  eliminarMemorama(id: number): void {
    this.juegoService.eliminarMemorama(id).subscribe(
      () => {
        this.memoramas = this.memoramas.filter(m => m.id !== id);
        alert('Memorama eliminado exitosamente');
      },
      (error) => console.error('Error al eliminar memorama', error)
    );
  }

  generarCartas(): Carta[] {
    const valores = ['Sad - Triste', 'Happy - Feliz', 'Hot - Caliente', 'New - Nuevo', 'Big - Grande', 'Small - Pequeño', 'Expensive - Caro', 'Tall - Alto', 'Ugly - Feo', 'Brave - Valiente'];
    const colores = ['carta-0', 'carta-1', 'carta-2', 'carta-3', 'carta-4', 'carta-5', 'carta-6', 'carta-7'];
    let id = 1;

    const cartas: Carta[] = [];

    valores.forEach((valor, index) => {
      const colorClass = colores[index % colores.length];
      cartas.push({ id: id++, valor, estado: 'cerrado', colorClass });
      cartas.push({ id: id++, valor, estado: 'cerrado', colorClass });
    });

    return this.shuffleArray(cartas);
  }

  shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
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
}
