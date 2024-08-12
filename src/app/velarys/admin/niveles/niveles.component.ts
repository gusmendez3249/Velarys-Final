import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NivelService } from '../../services/nivel.service';
import { Nivel } from './../../models/nivel.model';

// Validador personalizado para verificar el precio si esDePaga es verdadero
function precioRequeridoSiEsDePaga(): ValidatorFn {
  return (formGroup: AbstractControl): { [key: string]: any } | null => {
    const precio = formGroup.get('precio')?.value;
    const esDePaga = formGroup.get('esDePaga')?.value;

    if (esDePaga && (precio === null || precio <= 0)) {
      return { precioInvalido: true }; // Error si el precio es inválido
    }
    return null; // No hay error
  };
}

@Component({
  selector: 'app-niveles',
  templateUrl: './niveles.component.html',
  styleUrls: ['./niveles.component.css']
})
export class NivelesAdmin implements OnInit {
  cursoId: number = 0;
  niveles: Nivel[] = [];
  nuevoNivelForm: FormGroup;
  nivelEditadoForm: FormGroup;
  nivelEditado: Nivel | null = null;
  mostrarModal: boolean = false;
  mensajeModal: string = '';
  callbackConfirm: () => void = () => {};
  errorMensaje: string = '';
  nivelAEliminarId: number | null = null;
  esEdicion: boolean = false; // Variable para controlar el modo de edición

  constructor(
    private fb: FormBuilder,
    private nivelService: NivelService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.nuevoNivelForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: [0, [Validators.required, Validators.min(0)]],
      esDePaga: [false],
      acceso: [false],
      cursoId: [this.cursoId]
    }, { validator: precioRequeridoSiEsDePaga() }); // Aplicar validador personalizado

    this.nivelEditadoForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: [0, [Validators.required, Validators.min(0)]],
      esDePaga: [false],
      acceso: [false]
    }, { validator: precioRequeridoSiEsDePaga() }); // Aplicar validador personalizado
  }

  ngOnInit(): void {
    this.cursoId = +this.route.snapshot.paramMap.get('cursoId')!;
    this.obtenerNiveles();
  }

  obtenerNiveles(): void {
    this.nivelService.obtenerNivelesPorCurso(this.cursoId).subscribe(
      (niveles) => {
        this.niveles = niveles;
      },
      (error) => {
        console.error('Error al obtener los niveles:', error);
      }
    );
  }

  seleccionarNivel(nivel: Nivel): void {
    this.nivelEditado = { ...nivel };
    this.nivelEditadoForm.patchValue(nivel);
    this.esEdicion = true; // Activar el modo de edición
  }

  crearNivel(): void {
    if (this.nuevoNivelForm.valid) {
      this.mostrarConfirmacion('¿Estás seguro de que deseas crear este nivel?', () => {
        this.nuevoNivelForm.get('cursoId')?.setValue(this.cursoId); // Asegura que el cursoId sea el correcto
        this.nivelService.crearNivel(this.nuevoNivelForm.value).subscribe(
          (response) => {
            this.obtenerNiveles();
            this.nuevoNivelForm.reset();
            this.errorMensaje = ''; // Limpiar mensaje de error si la operación es exitosa
          },
          (error) => {
            console.error('Error al crear el nivel:', error);
            this.errorMensaje = 'Error al crear el nivel. Inténtelo de nuevo más tarde.'; // Mensaje de error
          }
        );
      });
    } else {
      this.errorMensaje = 'Por favor, completa todos los campos obligatorios.';
    }
  }

  actualizarNivel(): void {
    if (this.nivelEditadoForm.valid && this.nivelEditado) {
      const id = this.nivelEditado.id as number;
      if (id) {
        this.mostrarConfirmacion('¿Estás seguro de que deseas actualizar este nivel?', () => {
          this.nivelService.editarNivel(id, this.nivelEditadoForm.value).subscribe(
            (response) => {
              this.obtenerNiveles(); // Refrescar la lista de niveles
              this.nivelEditado = null; // Limpiar el nivel editado después de la actualización
              this.esEdicion = false; // Salir del modo de edición
              this.errorMensaje = ''; // Limpiar mensaje de error si la operación es exitosa
            },
            (error) => {
              console.error('Error al editar el nivel:', error);
              this.errorMensaje = 'Error al editar el nivel. Inténtelo de nuevo más tarde.'; // Mensaje de error
            }
          );
        });
      } else {
        console.error('ID del nivel no válido.');
        this.errorMensaje = 'ID del nivel no válido.'; // Mensaje de error si el ID es inválido
      }
    } else {
      this.errorMensaje = 'Por favor, completa todos los campos obligatorios.';
    }
  }
  cancelarEdicion(): void {
    this.nivelEditado = null;
    this.esEdicion = false; // Volver al modo de agregar
    this.nuevoNivelForm.reset(); // Opcional: Limpiar el formulario de agregar niveles
    this.errorMensaje = ''; // Limpiar mensaje de error
  }

  confirmarEliminarNivel(id: number): void {
    this.nivelAEliminarId = id;
    this.mostrarConfirmacion('¿Estás seguro de que deseas eliminar este nivel?', () => {
      if (this.nivelAEliminarId !== null) {
        this.eliminarNivel(this.nivelAEliminarId);
        this.nivelAEliminarId = null;
      }
    });
  }

  eliminarNivel(id: number): void {
    this.nivelService.eliminarNivel(id).subscribe(
      (response) => {
        this.obtenerNiveles();
      },
      (error) => {
        console.error('Error al eliminar el nivel:', error);
      }
    );
  }

  verLecciones(nivel: Nivel): void {
    this.router.navigate([`leccionesadmin/${this.cursoId}/${nivel.id}`]);
  }

  volver(): void {
    window.history.back();
  }

  onEsDePagaChange(): void {
    if (this.nuevoNivelForm.get('esDePaga')?.value) {
      this.nuevoNivelForm.get('precio')?.setValue(this.nuevoNivelForm.get('precio')?.value || 1);
    }
  }

  onEsDePagaChangeEditado(): void {
    if (this.nivelEditado && !this.nivelEditado.esDePaga) {
      this.nivelEditado.precio = 0;
    }
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
}
