import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { CursoService } from './../../services/curso.service';

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
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosAdmin implements OnInit {
  cursos: any[] = [];
  nuevoCursoForm: FormGroup;
  cursoEditadoForm: FormGroup;
  cursoEditado: any = null;
  mostrarModal: boolean = false;
  mensajeModal: string = '';
  callbackConfirm: () => void = () => {};
  errorMensaje: string = ''; // Mensaje de error

  constructor(
    private fb: FormBuilder,
    private cursoService: CursoService,
    private router: Router
  ) {
    this.nuevoCursoForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: [0, [Validators.required, Validators.min(0)]],
      esDePaga: [false],
      acceso: [false]
    }, { validator: precioRequeridoSiEsDePaga() }); // Aplicar validador personalizado

    this.cursoEditadoForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: [0, [Validators.required, Validators.min(0)]],
      esDePaga: [false],
      acceso: [false]
    }, { validator: precioRequeridoSiEsDePaga() }); // Aplicar validador personalizado

    // Suscribirse a los cambios en el campo precio para actualizar el campo esDePaga
    this.nuevoCursoForm.get('precio')?.valueChanges.subscribe(precio => {
      this.actualizarEsDePaga(precio, this.nuevoCursoForm.get('esDePaga'));
    });

    this.cursoEditadoForm.get('precio')?.valueChanges.subscribe(precio => {
      this.actualizarEsDePaga(precio, this.cursoEditadoForm.get('esDePaga'));
    });
  }

  ngOnInit(): void {
    this.obtenerCursos();
  }

  obtenerCursos(): void {
    this.cursoService.getCursos().subscribe(
      (response) => {
        this.cursos = response;
      },
      (error) => {
        console.error('Error al obtener los cursos:', error);
      }
    );
  }

  crearCurso(): void {
    if (this.nuevoCursoForm.valid) {
      this.mostrarConfirmacion('¿Estás seguro de que deseas crear este curso?', () => {
        this.cursoService.createCurso(this.nuevoCursoForm.value).subscribe(
          (response) => {
            this.errorMensaje = ''; // Limpiar mensaje de error
            this.obtenerCursos();
            this.nuevoCursoForm.reset();
          },
          (error) => {
            console.error('Error al crear el curso:', error);
            this.errorMensaje = 'Hubo un error al crear el curso. Inténtalo nuevamente.';
          }
        );
      });
    } else {
      this.errorMensaje = 'Por favor, completa todos los campos obligatorios.';
    }
  }

  editarCurso(curso: any): void {
    this.cursoEditado = { ...curso };
    this.cursoEditadoForm.patchValue(curso);

    // Asegurarse de que esDePaga esté correctamente ajustado
    this.actualizarEsDePaga(curso.precio, this.cursoEditadoForm.get('esDePaga'));
  }

  actualizarCurso(): void {
    if (this.cursoEditadoForm.valid) {
      this.mostrarConfirmacion('¿Estás seguro de que deseas actualizar este curso?', () => {
        this.cursoService.updateCurso(this.cursoEditado.id, this.cursoEditadoForm.value).subscribe(
          (response) => {
            this.errorMensaje = ''; // Limpiar mensaje de error
            this.obtenerCursos();
            this.cursoEditado = null;
          },
          (error) => {
            console.error('Error al actualizar el curso:', error);
            this.errorMensaje = 'Hubo un error al actualizar el curso. Inténtalo nuevamente.';
          }
        );
      });
    } else {
      this.errorMensaje = 'Por favor, completa todos los campos obligatorios.';
    }
  }

  cancelarEdicion(): void {
    this.cursoEditado = null;
    // Limpiar el formulario de edición
    this.cursoEditadoForm.reset();
    // Mostrar el formulario de agregar
    this.errorMensaje = ''; // Limpiar cualquier mensaje de error
  }

  eliminarCurso(id: number): void {
    this.mostrarConfirmacion('¿Estás seguro de que deseas eliminar este curso?', () => {
      this.cursoService.deleteCurso(id).subscribe(
        () => {
          this.errorMensaje = ''; // Limpiar mensaje de error
          this.obtenerCursos();
        },
        (error) => {
          console.error('Error al eliminar el curso:', error);
        alert('El curso contiene niveles, debes de eliminarlos primero.');
        }
      );
    });
  }

  verNiveles(curso: any): void {
    // Redirige a la página de niveles para el curso específico
    this.router.navigate([`niveladmin/${curso.id}`]);
  }


  volver(): void {
   window.history.back();
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



  // Método para actualizar el campo esDePaga basado en el valor de precio
  private actualizarEsDePaga(precio: number, esDePagaControl: AbstractControl | null): void {
    if (esDePagaControl) {
      if (precio > 0) {
        esDePagaControl.setValue(true, { emitEvent: false });
      } else {
        esDePagaControl.setValue(false, { emitEvent: false });
      }
    }
  }
}
