import { Component } from '@angular/core';
import { Direccion } from '../../models/direccion';
import { DireccionService } from '../../services/direccion.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-crear-direccion',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './crear-direccion.component.html',
  styleUrl: './crear-direccion.component.scss',
})
export class CrearDireccionComponent {
  direcciones: Direccion[] = [];
  nuevaDireccion: string = '';
  usuarioId: number | null = null; // Aquí tienes el ID del usuario autenticado
  token: string | null = null;

  constructor(private direccionService: DireccionService) {}

  ngOnInit(): void {
    // Obtener el 'usuarioId' y el 'token' del localStorage
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

    // Asegúrate de que 'currentUser' tiene el 'id' y el 'token'
    if (currentUser && currentUser.token && currentUser.id) {
      this.usuarioId = currentUser.id; // Obtener el ID del usuario logueado
      this.token = currentUser.token; // Obtener el token JWT
      console.log('Usuario autenticado, ID:', this.usuarioId);
    } else {
      console.error('Usuario no está autenticado.');
    }

    this.cargarDirecciones();
  }

  cargarDirecciones(): void {
    this.direccionService.listarDirecciones().subscribe(
      (data: Direccion[]) => {
        this.direcciones = data;
      },
      (error) => {
        console.error('Error al cargar las direcciones', error);
      }
    );
  }

  agregarDireccion(): void {
    if (this.nuevaDireccion.trim() && this.usuarioId !== null) {
      // Aquí solo pasas la dirección y el usuarioId
      const direccion = new Direccion(this.nuevaDireccion, this.usuarioId);

      this.direccionService.crearDireccion(direccion).subscribe(
        (data) => {
          this.direcciones.push(data); // Añadir la nueva dirección a la lista
          this.nuevaDireccion = ''; // Limpiar el campo de entrada
        },
        (error) => {
          console.error('Error al agregar la dirección', error);
        }
      );
    } else {
      console.error('Usuario no está autenticado o dirección no válida.');
    }
  }

  eliminarDireccion(id: number): void {
    this.direccionService.eliminarDireccion(id).subscribe(
      () => {
        this.direcciones = this.direcciones.filter((dir) => dir.id !== id);
      },
      (error) => {
        console.error('Error al eliminar la dirección', error);
      }
    );
  }
}
