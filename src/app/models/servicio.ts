// models/servicio.ts
import { Usuario } from './usuario';

export class Servicio {
  id?: number;
  titulo: string;
  descripcion: string;
  usuario: Usuario | null; // Relación con Usuario

  constructor(
    id?: number,
    titulo: string = '',
    descripcion: string = '',
    usuario: Usuario | null = null
  ) {
    this.id = id;
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.usuario = usuario;
  }
}
