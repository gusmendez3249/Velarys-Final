import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MemoramaService } from './../../../services/memorama.service';
import { Memorama } from './../../../models/memorama.model';
import { Carta } from './../../../models/carta.model';

@Component({
  selector: 'app-memoramas',
  templateUrl: './memorama.component.html',
  styleUrls: ['./memorama.component.css']
})
export class MemoramaAdmin implements OnInit {
  memoramas: Memorama[] = [];
  cartas: Carta[] = [];
  nuevaMemoramaForm: FormGroup;
  memoramaEditadaForm: FormGroup;
  cartaForm: FormGroup;
  memoramaEditada: Memorama | null = null;
  cartaEditada: Carta | null = null;
  leccionId: number = 0;
  mostrarModal: boolean = false;
  mensajeModal: string = '';
  callbackConfirm: () => void = () => {};
  errorMensaje: string = '';

  constructor(
    private memoramaService: MemoramaService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.nuevaMemoramaForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      leccionId: [this.leccionId]
    });

    this.memoramaEditadaForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required]
    });

    this.cartaForm = this.fb.group({
      valor: ['', Validators.required],
      estado: ['cerrado', Validators.required]
    });
  }

  ngOnInit(): void {
    const leccionIdParam = this.route.snapshot.paramMap.get('leccionId');
    this.leccionId = leccionIdParam ? +leccionIdParam : 0;
    this.obtenerMemoramas();
  }

  obtenerMemoramas(): void {
    if (this.leccionId) {
      this.memoramaService.obtenerMemoramasPorLeccionId(this.leccionId).subscribe(
        (response: Memorama[]) => this.memoramas = response,
        error => this.manejarError('Hubo un error al obtener los memoramas. Inténtalo nuevamente.', error)
      );
    }
  }

  seleccionarMemorama(memorama: Memorama): void {
    this.memoramaEditada = memorama;
    this.memoramaEditadaForm.patchValue(memorama);
    this.obtenerCartas(memorama.id ?? 0);
  }

  cancelarEdicion(): void {
    this.memoramaEditada = null;
    this.cartaEditada = null;
    this.memoramaEditadaForm.reset();
    this.cartaForm.reset();
  }

  crearMemorama(): void {
    if (this.nuevaMemoramaForm.valid) {
      this.mostrarConfirmacion('¿Estás seguro de que deseas crear este memorama?', () => {
        const memoramaConLeccionId: Memorama = { ...this.nuevaMemoramaForm.value, leccionId: this.leccionId };
        this.memoramaService.crearMemorama(memoramaConLeccionId).subscribe(
          response => {
            this.errorMensaje = '';
            this.obtenerMemoramas();
            this.nuevaMemoramaForm.reset({ leccionId: this.leccionId });
          },
          error => this.manejarError('Hubo un error al crear el memorama. Inténtalo nuevamente.', error)
        );
      });
    } else {
      this.errorMensaje = 'Por favor, completa todos los campos obligatorios.';
      this.marcarCamposComoTocados(this.nuevaMemoramaForm);
    }
  }

  editarMemorama(): void {
    if (this.memoramaEditada && this.memoramaEditada.id !== undefined && !isNaN(this.memoramaEditada.id) && this.memoramaEditadaForm.valid) {
      const memoramaId = this.memoramaEditada.id as number;
      this.mostrarConfirmacion('¿Estás seguro de que deseas actualizar este memorama?', () => {
        const memoramaActualizado: Memorama = {
          ...this.memoramaEditadaForm.value,
          leccionId: this.leccionId
        };
        this.memoramaService.actualizarMemorama(memoramaId, memoramaActualizado).subscribe(
          response => {
            this.errorMensaje = '';
            this.obtenerMemoramas();
            this.memoramaEditada = null;
            this.memoramaEditadaForm.reset();
          },
          error => this.manejarError('Hubo un error al editar el memorama. Inténtalo nuevamente.', error)
        );
      });
    } else {
      this.errorMensaje = 'Por favor, completa todos los campos obligatorios.';
      this.marcarCamposComoTocados(this.memoramaEditadaForm);
    }
  }

  eliminarMemorama(id: number): void {
    this.mostrarConfirmacion('¿Estás seguro de que deseas eliminar este memorama?', () => {
      this.memoramaService.eliminarMemorama(id).subscribe(
        response => {
          this.errorMensaje = '';
          this.obtenerMemoramas();
          this.cancelarEdicion();
        },
        error => this.manejarError('Hubo un error al eliminar el memorama. Inténtalo nuevamente.', error)
      );
    });
  }

  crearCarta(): void {
    if (this.cartaForm.valid && this.memoramaEditada?.id) {
      const carta: Carta = { ...this.cartaForm.value, memoramaId: this.memoramaEditada.id };
      this.memoramaService.crearCarta(carta).subscribe(
        response => {
          this.errorMensaje = '';
          if (this.memoramaEditada?.id) {
            this.obtenerCartas(this.memoramaEditada.id);
          }
          this.cartaForm.reset();
        },
        error => this.manejarError('Hubo un error al crear la carta. Inténtalo nuevamente.', error)
      );
    } else {
      this.errorMensaje = 'Por favor, completa todos los campos obligatorios.';
      this.marcarCamposComoTocados(this.cartaForm);
    }
  }

  editarCarta(carta: Carta): void {
    this.cartaEditada = carta;
    this.cartaForm.patchValue(carta);
  }

  actualizarCarta(): void {
    if (this.cartaEditada?.id && this.cartaForm.valid) {
      const cartaActualizada = { ...this.cartaForm.value };
      this.memoramaService.actualizarCarta(this.cartaEditada.id, cartaActualizada).subscribe(
        response => {
          this.errorMensaje = '';
          if (this.memoramaEditada?.id) {
            this.obtenerCartas(this.memoramaEditada.id);
          }
          this.cartaEditada = null;
          this.cartaForm.reset();
        },
        error => this.manejarError('Hubo un error al editar la carta. Inténtalo nuevamente.', error)
      );
    } else {
      this.errorMensaje = 'Por favor, completa todos los campos obligatorios.';
      this.marcarCamposComoTocados(this.cartaForm);
    }
  }

  eliminarCarta(id: number): void {
    this.mostrarConfirmacion('¿Estás seguro de que deseas eliminar esta carta?', () => {
      this.memoramaService.eliminarCarta(id).subscribe(
        response => {
          this.errorMensaje = '';
          if (this.memoramaEditada?.id) {
            this.obtenerCartas(this.memoramaEditada.id);
          }
        },
        error => this.manejarError('Hubo un error al eliminar la carta. Inténtalo nuevamente.', error)
      );
    });
  }

  obtenerCartas(memoramaId: number): void {
    this.memoramaService.obtenerCartasPorMemoramaId(memoramaId).subscribe(
      (response: Carta[]) => this.cartas = response,
      error => this.manejarError('Hubo un error al obtener las cartas. Inténtalo nuevamente.', error)
    );
  }

  private mostrarConfirmacion(mensaje: string, callback: () => void): void {
    this.mensajeModal = mensaje;
    this.callbackConfirm = callback;
    this.mostrarModal = true;
  }

  confirmarAccion(): void {
    this.callbackConfirm();
    this.cerrarModal();
  }

  cerrarModal(): void {
    this.mostrarModal = false;
  }

  volver(): void{
    window.history.back();
  }

  private manejarError(mensaje: string, error: any): void {
    console.error(error);
    this.errorMensaje = mensaje;
  }

  private marcarCamposComoTocados(form: FormGroup): void {
    Object.keys(form.controls).forEach(key => {
      const control = form.get(key);
      if (control) {
        control.markAsTouched();
        control.updateValueAndValidity();
      }
    });
  }
}
