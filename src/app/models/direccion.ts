export class Direccion {
  id!: number;
  direccion!: string;
  usuarioId!: number; // Este campo vincula la dirección con un usuario (opcional si lo necesitas)

  constructor(id: number, direccion: string, usuarioId: number) {
    this.id = id;
    this.direccion = direccion;
    this.usuarioId = usuarioId;
  }
}
