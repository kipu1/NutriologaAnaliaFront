export interface Curso {
  id?: number;
  nombre: string;
  descripcion: string;
  precio: string;
  password: string;
  pdfUrl?: string; // Puedes almacenar la URL del archivo subido
  archivoPdf?: File; // Este es el archivo que se va a subir
}
