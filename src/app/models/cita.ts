export class Cita {
  constructor(
    public id: number | undefined,
    public nombre: string,
    public cedula: string, // Nuevo campo para la cédula
    public telefono: string,
    public fechaHora: string,
    public motivo: string
  ) {}
}

/*export class Cita {
  id?: number;
  nombre: string;
  telefono: string;
  fechaHora: string; // Cambiado a string
  motivo: string;

  constructor(
    id: number | undefined,
    nombre: string,
    telefono: string,
    fechaHora: string, // Aquí también tipo string
    motivo: string
  ) {
    this.id = id;
    this.nombre = nombre;
    this.telefono = telefono;
    this.fechaHora = fechaHora;
    this.motivo = motivo;
  }
}

export class Cita {
  id?: number;
  nombre: string;
  telefono: string;
  fechaHora: Date; // Cambia el tipo a Date
  motivo: string;

  constructor(
    id: number | undefined,
    nombre: string,
    telefono: string,
    fechaHora: Date, // Aquí también tipo Date
    motivo: string
  ) {
    this.id = id;
    this.nombre = nombre;
    this.telefono = telefono;
    this.fechaHora = fechaHora;
    this.motivo = motivo;
  }
}*/
