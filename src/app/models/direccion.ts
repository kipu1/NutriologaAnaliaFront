export class Direccion {
  id?: number;
  direccion: string;
  usuarioId: number; // En lugar de un objeto Usuario, solo necesitas el usuarioId

  constructor(direccion: string, usuarioId: number, id?: number) {
    this.direccion = direccion;
    this.usuarioId = usuarioId;
    this.id = id; // Es opcional, ya que se genera en el backend
  }
}
