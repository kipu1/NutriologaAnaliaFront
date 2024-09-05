export class Cita {
  id: number;
  nombre: string;
  fechaHora: string;
  motivo: string;
  telefono: string;

  constructor(
    id: number,
    nombre: string,
    fechaHora: string,
    motivo: string,
    telefono: string
  ) {
    this.id = id;
    this.nombre = nombre;
    this.fechaHora = fechaHora;
    this.motivo = motivo;
    this.telefono = telefono;
  }
}
