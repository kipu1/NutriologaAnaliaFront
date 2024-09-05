export class Curso {
  id: number;
  nombre: string;
  descripcion: string;
  pdfUrl: string;

  constructor(id: number, nombre: string, descripcion: string, pdfUrl: string) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.pdfUrl = pdfUrl;
  }
}
