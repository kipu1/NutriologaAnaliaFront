// models/servicio.ts
import { Usuario } from './usuario';

export class Direccion {
  id?: number;
  direccion: string;

  usuario: Usuario | null; // Relación con Usuario

  constructor(
    id?: number,
    direccion: string = '',

    usuario: Usuario | null = null
  ) {
    this.id = id;
    this.direccion = direccion;

    this.usuario = usuario;
  }
}
