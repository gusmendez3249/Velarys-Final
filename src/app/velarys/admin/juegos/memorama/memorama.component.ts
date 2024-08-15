import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MemoramaService } from '../../../services/memorama.service';
import { Memorama, Carta } from '../../../models/juego.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-memorama',
  templateUrl: './memorama.component.html',
  styleUrls: ['./memorama.component.css']
})
export class MemoramaAdmin implements OnInit {
  memoramas: Memorama[] = [];
  cartas: Carta[] = [];
  nuevoMemoramaForm: FormGroup;
  memoramaEditadoForm: FormGroup;
  nuevaCartaForm: FormGroup;
  memoramaEditado: Memorama | null = null;
  cartaEditada: Carta | null = null;
  esEdicionMemorama: boolean = false;
  esEdicionCarta: boolean = false;
  mensajeModal: string = '';
  mostrarModal: boolean = false;
  callbackConfirm: () => void = () => {};
  errorMensaje: string = '';
  leccionId: number;

  constructor(
    private fb: FormBuilder,
    private memoramaService: MemoramaService,
    private route: ActivatedRoute
  ) {
    this.nuevoMemoramaForm = this.fb.group({
      nombre: ['', Validators.required]
    });

    this.memoramaEditadoForm = this.fb.group({
      nombre: ['', Validators.required]
    });

    this.nuevaCartaForm = this.fb.group({
      valor: ['', Validators.required],
      estado: ['', Validators.required],
      colorClass: ['', Validators.required]
    });

    this.leccionId = +this.route.snapshot.paramMap.get('leccionId')!; // Extraer leccionId de la ruta
  }

  ngOnInit(): void {
    this.obtenerMemoramas();
  }

  obtenerMemoramas(): void {
    this.memoramaService.obtenerMemoramasPorLeccion(this.leccionId).subscribe(
      (memoramas: Memorama[]) => {
        this.memoramas = memoramas;
      },
      (error: any) => {
        console.error('Error al obtener los memoramas:', error);
      }
    );
  }

  seleccionarMemorama(memorama: Memorama): void {
    this.memoramaEditado = { ...memorama };
    this.memoramaEditadoForm.patchValue(memorama);
    if (this.memoramaEditado?.id) {
      this.obtenerCartas(this.memoramaEditado.id);
    }
    this.esEdicionMemorama = true;
  }

  obtenerCartas(memoramaId: number): void {
    this.memoramaService.obtenerCartasPorMemoramaId(memoramaId).subscribe(
      (cartas: Carta[]) => {
        this.cartas = cartas;
      },
      (error: any) => {
        console.error('Error al obtener las cartas:', error);
      }
    );
  }

  crearMemorama(): void {
    if (this.nuevoMemoramaForm.valid) {
      const nuevoMemorama = {
        ...this.nuevoMemoramaForm.value,  // Obtiene los valores del formulario
        leccionId: this.leccionId         // Agrega el leccionId actual
      };

      this.memoramaService.crearMemorama(nuevoMemorama).subscribe(
        () => {
          this.obtenerMemoramas(); // Recarga la lista de memoramas
          this.nuevoMemoramaForm.reset(); // Resetea el formulario
        },
        (error: any) => {
          console.error('Error al crear el memorama:', error);
          this.errorMensaje = 'Error al crear el memorama. Inténtelo de nuevo más tarde.';
        }
      );
    }
  }


  actualizarMemorama(): void {
    const id = this.memoramaEditado?.id;
    if (id && this.memoramaEditadoForm.valid) {
      this.memoramaService.actualizarMemorama(id, this.memoramaEditadoForm.value).subscribe(
        () => {
          this.obtenerMemoramas();
          this.esEdicionMemorama = false;
        },
        (error: any) => {
          console.error('Error al actualizar el memorama:', error);
          this.errorMensaje = 'Error al actualizar el memorama. Inténtelo de nuevo más tarde.';
        }
      );
    }
  }

  eliminarMemorama(id: number): void {
    this.mostrarConfirmacion('¿Estás seguro de que deseas eliminar este memorama?', () => {
      this.memoramaService.eliminarMemorama(id).subscribe(
        () => {
          this.obtenerMemoramas();
        },
        (error: any) => {
          console.error('Error al eliminar el memorama:', error);
        }
      );
    });
  }

  cancelarEdicionMemorama(): void {
    this.memoramaEditado = null;
    this.esEdicionMemorama = false;
    this.memoramaEditadoForm.reset();
  }

  seleccionarCarta(carta: Carta): void {
    this.cartaEditada = { ...carta };
    this.nuevaCartaForm.patchValue(carta);
    this.esEdicionCarta = true;
  }

  agregarCartas(): void {
    const memoramaId = this.memoramaEditado?.id;
    if (this.nuevaCartaForm.valid && memoramaId !== undefined) {
      const nuevaCarta = { ...this.nuevaCartaForm.value };
      this.memoramaService.crearCarta(memoramaId, nuevaCarta).subscribe(
        () => {
          this.obtenerCartas(memoramaId);
          this.nuevaCartaForm.reset();
        },
        (error: any) => {
          console.error('Error al crear la carta:', error);
          this.errorMensaje = 'Error al crear la carta. Inténtelo de nuevo más tarde.';
        }
      );
    }
  }

  actualizarCarta(): void {
    const memoramaId = this.memoramaEditado?.id;
    const cartaId = this.cartaEditada?.id;
    if (cartaId !== undefined && this.nuevaCartaForm.valid && memoramaId !== undefined) {
      this.memoramaService.actualizarCarta(memoramaId, cartaId, this.nuevaCartaForm.value).subscribe(
        () => {
          this.obtenerCartas(memoramaId);
          this.cartaEditada = null;
          this.esEdicionCarta = false;
        },
        (error: any) => {
          console.error('Error al actualizar la carta:', error);
          this.errorMensaje = 'Error al actualizar la carta. Inténtelo de nuevo más tarde.';
        }
      );
    }
  }

  eliminarCarta(id: number): void {
    const memoramaId = this.memoramaEditado?.id;
    if (memoramaId !== undefined) {
      this.mostrarConfirmacion('¿Estás seguro de que deseas eliminar esta carta?', () => {
        this.memoramaService.eliminarCarta(memoramaId, id).subscribe(
          () => {
            this.obtenerCartas(memoramaId);
          },
          (error: any) => {
            console.error('Error al eliminar la carta:', error);
          }
        );
      });
    }
  }

  mostrarConfirmacion(mensaje: string, callback: () => void): void {
    this.mensajeModal = mensaje;
    this.mostrarModal = true;
    this.callbackConfirm = callback;
  }

  confirmar(): void {
    this.mostrarModal = false;
    this.callbackConfirm();
  }

  cancelar(): void {
    this.mostrarModal = false;
    this.callbackConfirm = () => {};
  }
}
