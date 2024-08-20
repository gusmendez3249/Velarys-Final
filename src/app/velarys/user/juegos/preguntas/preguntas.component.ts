import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PreguntaService } from '../../../services/preguntas.service';
import { Pregunta, Opcion } from '../../../models/preguntas.model';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.css']
})
export class PreguntasComponent implements OnInit {
  cursoId!: string;
  nivelId!: string;
  leccionId!: string;
  preguntas: Pregunta[] = [];
  preguntaActual: Pregunta | null = null;
  respuestaSeleccionada: string | null = null;
  puntaje = 0;
  mensajeFinal = '';
  preguntaIndex = 0;

  constructor(
    private route: ActivatedRoute,
    private preguntaService: PreguntaService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.cursoId = params.get('cursoId')!;
      this.nivelId = params.get('nivelId')!;
      this.leccionId = params.get('leccionId')!;
      this.loadPreguntas();
    });
  }

  loadPreguntas(): void {
    this.preguntaService.getPreguntasPorLeccion(+this.leccionId).subscribe(
      data => {
        this.preguntas = this.shuffleArray(data);
        this.showNextPregunta();
      },
      error => this.handleError('Error al cargar las preguntas.', error)
    );
  }

  showNextPregunta(): void {
    if (this.preguntaIndex < this.preguntas.length) {
      this.preguntaActual = this.preguntas[this.preguntaIndex];
      this.respuestaSeleccionada = null;
    } else {
      this.mensajeFinal = `¡Juego terminado! Puntaje final: ${this.puntaje}`;
      this.preguntaActual = null;
    }
  }

  selectOption(opcion: Opcion): void {
    // Permitir cambiar de opción
    this.respuestaSeleccionada = (this.respuestaSeleccionada === opcion.texto) ? null : opcion.texto;
  }

  submitAnswer(): void {
    if (this.respuestaSeleccionada) {
      // Verificar respuesta seleccionada
      const opcionSeleccionada = this.preguntaActual?.opciones.find(opcion => opcion.texto === this.respuestaSeleccionada);
      if (opcionSeleccionada?.esCorrecta) {
        this.puntaje++;
      }

      this.preguntaIndex++;
      this.showNextPregunta();

      // Resetear color de la opción seleccionada
      const opciones = document.querySelectorAll('.opcion-label');
      opciones.forEach(option => option.classList.remove('opcion-seleccionada'));
    }
  }

  volver(): void {
    window.history.back();
  }

  handleError(mensaje: string, error: any): void {
    console.error(error);
    alert(mensaje);
  }

  shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  reiniciarJuego(): void {
    this.puntaje = 0;
    this.preguntaIndex = 0;
    this.mensajeFinal = '';
    this.loadPreguntas();
  }

  salir(): void {
    window.history.back();
  }
}
