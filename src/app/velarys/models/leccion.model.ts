export interface Leccion {
  id?: number;
  nivelId: number;          // Opcional si no se establece en la creación
  nombre: string;
  contenido: string;

}
