import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LeccionService } from './../../services/leccion.service';
import { Leccion } from './../../models/leccion.model';

@Component({
  selector: 'app-lecciones',
  templateUrl: './lecciones.component.html',
  styleUrls: ['./lecciones.component.css']
})
export class LeccionesAdmin implements OnInit {
  lecciones: Leccion[] = [];
  nuevaLeccionForm: FormGroup;
  leccionEditadaForm: FormGroup;
  leccionEditada: Leccion | null = null;
  nivelId: number = 0;
  cursoId: number | null = null;
  mostrarModal: boolean = false;
  mensajeModal: string = '';
  callbackConfirm: () => void = () => {};
  errorMensaje: string = ''; // Mensaje de error

  constructor(
    private leccionService: LeccionService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.nuevaLeccionForm = this.fb.group({
      nombre: ['', Validators.required],
      contenido: ['', Validators.required],
      nivelId: [this.nivelId]
    });

    this.leccionEditadaForm = this.fb.group({
      nombre: ['', Validators.required],
      contenido: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.cursoId = +this.route.snapshot.paramMap.get('cursoId')!;
    this.nivelId = +this.route.snapshot.paramMap.get('nivelId')!;
    this.obtenerLecciones();
  }

  obtenerLecciones(): void {
    if (this.nivelId !== null) {
      this.leccionService.obtenerLeccionesPorNivelId(this.nivelId).subscribe(
        response => {
          this.lecciones = response;
        },
        error => this.manejarError(error, 'Error al obtener las lecciones.')
      );
    }
  }

  crearLeccion(): void {
    if (this.nuevaLeccionForm.valid) {
      this.mostrarConfirmacion('¿Estás seguro de que deseas crear esta lección?', () => {
        const leccionConNivelId: Leccion = { ...this.nuevaLeccionForm.value, nivelId: this.nivelId };
        this.leccionService.crearLeccion(leccionConNivelId).subscribe(
          response => {
            this.errorMensaje = ''; // Limpiar mensaje de error
            this.obtenerLecciones();
            this.nuevaLeccionForm.reset({ nivelId: this.nivelId }); // Restablecer pero mantener nivelId
          },
          error => this.manejarError(error, 'Hubo un error al crear la lección. Inténtalo nuevamente.')
        );
      });
    } else {
      this.errorMensaje = 'Por favor, completa todos los campos obligatorios.';
    }
  }

  seleccionarLeccion(leccion: Leccion): void {
    this.leccionEditada = { ...leccion };
    this.leccionEditadaForm.patchValue(leccion);
  }

  editarLeccion(): void {
    if (this.leccionEditada && this.leccionEditada.id && this.leccionEditadaForm.valid) {
      this.mostrarConfirmacion('¿Estás seguro de que deseas actualizar esta lección?', () => {
        const leccionActualizada = { ...this.leccionEditadaForm.value, nivelId: this.nivelId };

        if (this.leccionEditada?.id) {  // Verifica que leccionEditada no sea null antes de acceder a id
          this.leccionService.actualizarLeccion(this.leccionEditada.id, leccionActualizada).subscribe(
            response => {
              this.errorMensaje = ''; // Limpiar mensaje de error
              this.obtenerLecciones();
              this.leccionEditada = null;
              this.leccionEditadaForm.reset();
            },
            error => this.manejarError(error, 'Hubo un error al editar la lección. Inténtalo nuevamente.')
          );
        }
      });
    } else {
      this.errorMensaje = 'Por favor, completa todos los campos obligatorios.';
    }
  }

  eliminarLeccion(id: number): void {
    this.mostrarConfirmacion('¿Estás seguro de que deseas eliminar esta lección?', () => {
      this.leccionService.eliminarLeccion(id).subscribe(
        () => {
          this.errorMensaje = ''; // Limpiar mensaje de error
          this.obtenerLecciones();
        },
        error => this.manejarError(error, 'Error al eliminar la lección.')
      );
    });
  }

  volver(): void {
    window.history.back();
  }

  verJuegos(leccion: Leccion): void {
    if (this.cursoId) {
      this.router.navigate([`juegosadmin/${this.cursoId}/${this.nivelId}/${leccion.id}`]);
    } else {
      this.errorMensaje = 'Curso no identificado. No se puede navegar a los juegos.';
    }
  }

  cancelarEdicion(): void {
    this.leccionEditada = null;
    this.leccionEditadaForm.reset();
    this.errorMensaje = ''; // Limpiar cualquier mensaje de error
  }

  mostrarConfirmacion(mensaje: string, callback: () => void): void {
    this.mensajeModal = mensaje;
    this.callbackConfirm = callback;
    this.mostrarModal = true;
  }

  cerrarModal(): void {
    this.mostrarModal = false;
  }

  confirmarAccion(): void {
    if (this.callbackConfirm) {
      this.callbackConfirm();
    }
    this.cerrarModal();
  }

  manejarError(error: any, mensaje: string): void {
    console.error(mensaje, error);
    this.errorMensaje = mensaje;
  }
}
