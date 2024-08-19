import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PreguntaService } from '../../../services/preguntas.service';
import { Pregunta, Opcion } from '../../../models/preguntas.model';

@Component({
  selector: 'app-preguntas-admin',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.css']
})
export class PreguntasAdmin implements OnInit {
  cursoId: string | null = null;
  nivelId: string | null = null;
  leccionId: string | null = null;
  preguntas: Pregunta[] = [];
  pregunta: Pregunta = { texto: '', opciones: [], respuesta_correcta: '' };
  editing: boolean = false;
  formErrors: { [key: string]: string } = {}; // Mensajes de error para los campos
  mostrarModal: boolean = false;
  mensajeModal: string = '';
  callbackConfirm: () => void = () => {};

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
    if (!this.validatePregunta()) return;
    this.mostrarConfirmacion(
      '¿Estás seguro de que deseas crear esta pregunta?',
      () => {
        const newPregunta = this.preparePregunta();
        this.preguntaService.createPregunta(newPregunta).subscribe(
          () => {
            this.loadPreguntas();
            this.resetForm();
          },
          error => this.handleError('Error al crear la pregunta.', error)
        );
      }
    );
  }

  updatePregunta(): void {
    if (this.pregunta.id === undefined) {
      this.handleError('ID de pregunta no está definido. No se puede actualizar.', null);
      return;
    }
    if (!this.validatePregunta()) return;
    this.mostrarConfirmacion(
      '¿Estás seguro de que deseas actualizar esta pregunta?',
      () => {
        const updatedPregunta = this.preparePregunta();
        this.preguntaService.updatePregunta(this.pregunta.id!, updatedPregunta).subscribe(
          () => {
            this.loadPreguntas();
            this.resetForm();
          },
          error => this.handleError('Error al actualizar la pregunta.', error)
        );
      }
    );
  }

  deletePregunta(id: number): void {
    this.mostrarConfirmacion(
      '¿Estás seguro de que deseas eliminar esta pregunta?',
      () => {
        this.preguntaService.deletePregunta(id).subscribe(
          () => this.loadPreguntas(),
          error => this.handleError('Error al eliminar la pregunta.', error)
        );
      }
    );
  }

  validatePregunta(): boolean {
    this.formErrors = {}; // Resetear errores
    let isValid = true;

    if (!this.pregunta.texto) {
      this.formErrors['texto'] = 'El texto de la pregunta es obligatorio.';
      isValid = false;
    }

    if (!this.pregunta.respuesta_correcta) {
      this.formErrors['respuesta_correcta'] = 'La respuesta correcta es obligatoria.';
      isValid = false;
    }

    if (this.pregunta.opciones.length === 0) {
      this.formErrors['general'] = 'Debe agregar al menos una opción.';
      isValid = false;
    } else {
      this.pregunta.opciones.forEach((opcion, index) => {
        if (!opcion.texto) {
          this.formErrors['opcionTexto' + index] = 'El texto de la opción es obligatorio.';
          isValid = false;
        }
      });
    }

    return isValid;
  }

  preparePregunta(): Pregunta {
    return {
      ...this.pregunta,
      leccionId: this.leccionId ? parseInt(this.leccionId, 10) : undefined
    };
  }

  resetForm(): void {
    this.pregunta = { texto: '', opciones: [], respuesta_correcta: '' };
    this.editing = false;
    this.formErrors = {};
  }

  mostrarConfirmacion(mensaje: string, callback: () => void): void {
    this.mensajeModal = mensaje;
    this.mostrarModal = true;
    this.callbackConfirm = callback;
  }

  confirmarAccion(): void {
    this.callbackConfirm();
    this.cerrarModal();
  }

  cerrarModal(): void {
    this.mostrarModal = false;
  }

  handleError(mensaje: string, error: any): void {
    console.error(error);
    this.formErrors['general'] = mensaje;
  }

  addOpcion(): void {
    this.pregunta.opciones.push({ texto: '', esCorrecta: false });
  }

  removeOpcion(index: number): void {
    this.pregunta.opciones.splice(index, 1);
  }

  cancelarEdicion(): void {
    this.resetForm();
  }

  volver(): void {
    this.router.navigate(['/']);
  }
}
