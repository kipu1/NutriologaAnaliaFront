export class Curso {
  id: number;
  nombre: string;
  descripcion: string;
  precio: string;
  fileUrl: string;
  password: string;

  constructor(
    id: number,
    nombre: string,
    descripcion: string,
    precio: string,
    fileUrl: string,
    password: string
  ) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio = precio;
    this.fileUrl = fileUrl;
    this.password = password;
  }
}
