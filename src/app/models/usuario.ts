export class Usuario {
  id?: number; // Hacer el id opcional
  nombre: string;
  correo: string;
  contrasena: string; // Asegúrate de que la ñ se cambie a n para evitar problemas

  constructor(nombre: string, correo: string, contrasena: string, id?: number) {
    this.nombre = nombre;
    this.correo = correo;
    this.contrasena = contrasena;
    this.id = id;
  }
}
