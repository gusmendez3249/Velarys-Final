import { PreguntaService } from '../../../services/preguntas.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pregunta, Opcion } from '../../../models/preguntas.model'; // Asegúrate de tener estas interfaces definidas

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.css']
})
export class PreguntasAdmin implements OnInit {
  cursoId: string | null = null;
  nivelId: string | null = null;
  leccionId: string | null = null;
  preguntas: Pregunta[] = [];
  pregunta: Pregunta = { texto: '', opciones: [], respuesta_correcta: '' }; // Inicializa con todas las propiedades
  editing: boolean = false;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private preguntaService: PreguntaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.cursoId = params.get('cursoId');
      this.nivelId = params.get('nivelId');
      this.leccionId = params.get('leccionId');
      if (this.leccionId) {
        this.loadPreguntas();
      }
    });
  }

  loadPreguntas(): void {
    if (this.leccionId) {
      this.preguntaService.getAllPreguntas().subscribe(
        (data: Pregunta[]) => {
          this.preguntas = data.filter(p => p.leccionId === parseInt(this.leccionId!, 10));
        },
        error => this.handleError('Error al cargar las preguntas.', error)
      );
    }
  }

  viewPregunta(id: number): void {
    this.preguntaService.getPreguntaById(id).subscribe(
      (data: Pregunta) => {
        this.pregunta = data;
        this.editing = true;
      },
      error => this.handleError('Error al obtener la pregunta.', error)
    );
  }

  createPregunta(): void {
    const newPregunta = this.preparePregunta();
    this.preguntaService.createPregunta(newPregunta).subscribe(
      () => {
        this.loadPreguntas();
        this.resetForm();
      },
      error => this.handleError('Error al crear la pregunta.', error)
    );
  }

  updatePregunta(): void {
    if (this.pregunta.id === undefined) {
      console.error('ID de pregunta no está definido.');
      return;
    }
    const updatedPregunta = this.preparePregunta();
    this.preguntaService.updatePregunta(this.pregunta.id, updatedPregunta).subscribe(
      () => {
        this.loadPreguntas();
        this.resetForm();
      },
      error => this.handleError('Error al actualizar la pregunta.', error)
    );
  }

  deletePregunta(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar esta pregunta?')) {
      this.preguntaService.deletePregunta(id).subscribe(
        () => this.loadPreguntas(),
        error => this.handleError('Error al eliminar la pregunta.', error)
      );
    }
  }

  preparePregunta(): Pregunta {
    return {
      texto: this.pregunta.texto || '',
      opciones: this.pregunta.opciones || [],
      respuesta_correcta: this.pregunta.respuesta_correcta || '',
      leccionId: this.leccionId ? parseInt(this.leccionId, 10) : undefined
    };
  }

  resetForm(): void {
    this.pregunta = { texto: '', opciones: [], respuesta_correcta: '' }; // Resetea con un objeto completo
    this.editing = false;
  }

  handleError(message: string, error: any): void {
    this.errorMessage = message;
    console.error(message, error); // Mensaje añadido a los logs para claridad
  }

  volver(): void {
    window.history.back(); // Actualiza la ruta según corresponda
  }

  addOpcion(): void {
    this.pregunta.opciones.push({ texto: '', esCorrecta: false });
  }

  removeOpcion(index: number): void {
    this.pregunta.opciones.splice(index, 1);
  }
}
