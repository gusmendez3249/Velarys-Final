import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

interface Nivel {
  id: number;
  nombre: string;
  descripcion: string;
  esDePaga: boolean;
  acceso: boolean;
  precio?: number;
}

@Injectable({
  providedIn: 'root'
})
export class NivelesService {
  private niveles: Nivel[] = [
    { id: 1, nombre: 'Nivel 1', descripcion: 'Gratis', esDePaga: false, acceso: true },
    { id: 2, nombre: 'Nivel 2', descripcion: 'Paga', esDePaga: true, acceso: false, precio: 10 },
    { id: 3, nombre: 'Nivel 3', descripcion: 'Paga', esDePaga: true, acceso: false, precio: 20 }
  ];

  getNiveles(): Nivel[] {
    return this.niveles;
  }

  actualizarAcceso(id: number): void {
    const nivel = this.niveles.find(n => n.id === id);
    if (nivel) {
      nivel.acceso = true;
    }
  }

  verificarAcceso(id: number): boolean {
    const nivel = this.niveles.find(n => n.id === id);
    return nivel ? nivel.acceso : false;
  }

  realizarPago(id: number): Observable<boolean> {
    // Simulando un servicio de pago exitoso
    return new Observable<boolean>(observer => {
      setTimeout(() => {
        observer.next(true);
        observer.complete();
      }, 1000);
    });
  }
}
