export class Usuario {
  id?: number; // Hacer el id opcional
  nombre: string;
  correo: string;
  telefono: string;
  direccion: string;
  contrasena: string; // Asegúrate de que la ñ se cambie a n para evitar problemas

  constructor(
    nombre: string,
    correo: string,
    telefono: string,
    direccion: string,
    contrasena: string,
    id?: number
  ) {
    this.nombre = nombre;
    this.correo = correo;
    this.telefono = telefono;
    this.direccion = direccion;
    this.contrasena = contrasena;
    this.id = id;
  }
}
