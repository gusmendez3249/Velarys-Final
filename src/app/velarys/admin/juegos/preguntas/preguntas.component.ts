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
  cursoId!: string;
  nivelId!: string;
  leccionId!: string;
  preguntas: Pregunta[] = [];
  pregunta: Pregunta = this.getEmptyPregunta();
  editing = false;
  formErrors: { [key: string]: string } = {};
  mostrarModal = false;
  mensajeModal = '';
  callbackConfirm: () => void = () => {};

  constructor(
    private route: ActivatedRoute,
    private preguntaService: PreguntaService,
    private router: Router
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
        this.preguntas = data;
      },
      error => this.handleError('Error al cargar las preguntas.', error)
    );
  }

  viewPregunta(id: number): void {
    this.preguntaService.getPreguntaById(id).subscribe(
      data => {
        this.pregunta = data;
        this.editing = true;
      },
      error => this.handleError('Error al obtener la pregunta.', error)
    );
  }

  createPregunta(): void {
    if (!this.validatePregunta()) return;
    this.mostrarConfirmacion('¿Estás seguro de que deseas crear esta pregunta?', () => {
      this.preguntaService.createPregunta(this.preparePregunta()).subscribe(
        () => this.handleSuccess(),
        error => this.handleError('Error al crear la pregunta.', error)
      );
    });
  }

  updatePregunta(): void {
    if (!this.validatePregunta() || !this.pregunta.id) return;
    this.mostrarConfirmacion('¿Estás seguro de que deseas actualizar esta pregunta?', () => {
      this.preguntaService.updatePregunta(this.pregunta.id!, this.preparePregunta()).subscribe(
        () => this.handleSuccess(),
        error => this.handleError('Error al actualizar la pregunta.', error)
      );
    });
  }

  deletePregunta(id: number): void {
    this.mostrarConfirmacion('¿Estás seguro de que deseas eliminar esta pregunta?', () => {
      this.preguntaService.deletePregunta(id).subscribe(
        () => this.loadPreguntas(),
        error => this.handleError('Error al eliminar la pregunta.', error)
      );
    });
  }

  validatePregunta(): boolean {
    this.formErrors = {};
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
          this.formErrors[`opcionTexto${index}`] = 'El texto de la opción es obligatorio.';
          isValid = false;
        }
      });
    }

    return isValid;
  }

  preparePregunta(): Pregunta {
    this.pregunta.opciones.forEach(opcion => {
      opcion.esCorrecta = opcion.texto === this.pregunta.respuesta_correcta;
    });
    return { ...this.pregunta, leccionId: +this.leccionId };
  }

  addOpcion(): void {
    this.pregunta.opciones.push({ texto: '', esCorrecta: false });
  }

  removeOpcion(index: number): void {
    this.pregunta.opciones.splice(index, 1);
  }

  onCorrectOptionChange(selectedOption: Opcion): void {
    this.pregunta.opciones.forEach(opcion => {
      opcion.esCorrecta = opcion.texto === selectedOption.texto;
    });
  }

  cancelarEdicion(): void {
    this.editing = false;
    this.pregunta = this.getEmptyPregunta();
  }

  volver(): void {
    this.router.navigate(['/leccionesadmin', this.cursoId, this.nivelId]);
  }

  mostrarConfirmacion(mensaje: string, callbackConfirm: () => void): void {
    this.mensajeModal = mensaje;
    this.callbackConfirm = callbackConfirm;
    this.mostrarModal = true;
  }

  confirmarAccion(): void {
    this.callbackConfirm();
    this.cerrarModal();
  }

  cerrarModal(): void {
    this.mostrarModal = false;
  }

  handleSuccess(): void {
    this.loadPreguntas();
    this.cancelarEdicion();
  }

  handleError(mensaje: string, error: any): void {
    console.error(error);
    alert(mensaje);
  }

  getEmptyPregunta(): Pregunta {
    return {
      id: 0,
      texto: '',
      opciones: [],
      respuesta_correcta: ''
    };
  }
}
