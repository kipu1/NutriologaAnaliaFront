export class Cita {
  id?: number;
  nombre: string;
  telefono: string;
  fechaHora: string; // Cambiado a string
  motivo: string;

  constructor(
    id: number | undefined,
    nombre: string,
    telefono: string,
    fechaHora: string, // Aquí también string
    motivo: string
  ) {
    this.id = id;
    this.nombre = nombre;
    this.telefono = telefono;
    this.fechaHora = fechaHora;
    this.motivo = motivo;
  }
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
