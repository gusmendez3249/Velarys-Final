import { Component, OnInit } from '@angular/core';
import { JuegoService } from '../../../services/juego.service';
import { Memorama } from '../../../models/juego.model';

@Component({
  selector: 'app-memoramas-admin',
  templateUrl: './memorama.component.html',
  styleUrls: ['./memorama.component.css']
})
export class MemoramaComponent implements OnInit {
  memoramas: Memorama[] = [];
  memoramaForm: Memorama = { nombre: '', cartas: [] };
  isEdit: boolean = false;
  memoramaSeleccionado: Memorama | null = null;

  constructor(private juegoService: JuegoService) {}

  ngOnInit(): void {
    this.obtenerMemoramas();
  }

  obtenerMemoramas(): void {
    this.juegoService.obtenerMemoramas().subscribe(
      (data) => this.memoramas = data,
      (error) => console.error('Error al obtener memoramas', error)
    );
  }

  guardarMemorama(): void {
    if (this.isEdit) {
      if (this.memoramaSeleccionado) {
        const updatedMemorama = { ...this.memoramaSeleccionado, nombre: this.memoramaForm.nombre };
        this.juegoService.actualizarMemorama(updatedMemorama.id!, updatedMemorama).subscribe(
          () => {
            this.obtenerMemoramas();
            this.reiniciarFormulario();
          },
          (error) => console.error('Error al actualizar memorama', error)
        );
      }
    } else {
      const nuevoMemorama: Memorama = { nombre: this.memoramaForm.nombre, cartas: [] };
      this.juegoService.crearMemorama(nuevoMemorama).subscribe(
        (data) => {
          this.memoramas.push(data);
          this.reiniciarFormulario();
        },
        (error) => console.error('Error al crear memorama', error)
      );
    }
  }

  editarMemorama(memorama: Memorama): void {
    this.memoramaForm = { nombre: memorama.nombre, cartas: memorama.cartas };
    this.memoramaSeleccionado = memorama;
    this.isEdit = true;
  }

  eliminarMemorama(id: number): void {
    this.juegoService.eliminarMemorama(id).subscribe(
      () => {
        this.memoramas = this.memoramas.filter(m => m.id !== id);
        this.reiniciarFormulario();
      },
      (error) => console.error('Error al eliminar memorama', error)
    );
  }

  reiniciarFormulario(): void {
    this.memoramaForm = { nombre: '', cartas: [] };
    this.memoramaSeleccionado = null;
    this.isEdit = false;
  }
}
