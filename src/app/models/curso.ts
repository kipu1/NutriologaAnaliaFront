import { Usuario } from './usuario';

export class Curso {
  id: number;
  nombre: string;
  descripcion: string;
  precio: string;
  fileUrl: string;
  password: string;
  usuario: Usuario | null;
  telefonoUsuario: string; // Agrega esta línea para incluir el teléfono del usuario en el curso

  constructor(
    id: number,
    nombre: string,
    descripcion: string,
    precio: string,
    fileUrl: string,
    password: string,
    usuario: Usuario | null = null,
    telefonoUsuario: string = '' // Inicializa el teléfono del usuario
  ) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio = precio;
    this.fileUrl = fileUrl;
    this.password = password;
    this.usuario = usuario;
    this.telefonoUsuario = telefonoUsuario; // Asigna el teléfono del usuario
  }
}
