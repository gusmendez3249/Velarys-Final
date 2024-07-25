

import { Nivel } from './../../models/nivel.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NivelService } from '../../services/nivel.service';
import { CursosAdmin } from '../cursos/cursos.component';
@Component({
  selector: 'app-niveles',
  templateUrl: './niveles.component.html',
  styleUrls: ['./niveles.component.css']
})
export class NivelesAdmin implements OnInit {
  cursoSeleccionado: number = 0;
  cursoId: number = 0;
  niveles: Nivel[] = [];
  nuevoNivel: Nivel = {
    nombre: '',
    descripcion: '',
    esDePaga: false,
    acceso: false
  };
  nivelEditado: Nivel | null = null;

  constructor(private nivelService: NivelService, private route: ActivatedRoute, private router: Router) {}

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

  crearNivel(): void {
    this.nuevoNivel = { ...this.nuevoNivel, cursoId: this.cursoId };
    this.nivelService.crearNivel(this.nuevoNivel).subscribe(
      (response) => {
        alert('Nivel creado exitosamente');
        this.obtenerNiveles();
        this.nuevoNivel = {
          cursoId: this.cursoId,
          nombre: '',
          descripcion: '',
          esDePaga: false,
          acceso: false

        };
      },
      (error) => {
        console.error('Error al crear el nivel:', error);
      }
    );
  }

  editarNivel(): void {
    if (this.nivelEditado) {
      this.nivelService.editarNivel(this.nivelEditado.id!, this.nivelEditado).subscribe(
        (response) => {
          alert('Nivel editado exitosamente');
          this.obtenerNiveles();
          this.nivelEditado = null;
        },
        (error) => {
          console.error('Error al editar el nivel:', error);
        }
      );
    }
  }

  eliminarNivel(id: number): void {
    this.nivelService.eliminarNivel(id).subscribe(
      (response) => {
        alert('Nivel eliminado exitosamente');
        this.obtenerNiveles();
      },
      (error) => {
        console.error('Error al eliminar el nivel:', error);
      }
    );
  }

  seleccionarNivel(nivel: Nivel): void {
    this.nivelEditado = { ...nivel };
  }

  verLecciones(nivel: any): void {
    this.router.navigate([`leccionesadmin/${this.cursoSeleccionado}/${nivel.id}`]);
  }

  volver():void{
    window.history.back();
  }
}

