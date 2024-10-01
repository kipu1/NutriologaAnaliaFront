import { Component } from '@angular/core';
import { Direccion } from '../../models/direccion';
import { DireccionService } from '../../services/direccion.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-crear-direccion',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './crear-direccion.component.html',
  styleUrl: './crear-direccion.component.scss',
})
export class CrearDireccionComponent {
  direccion: Direccion;
  direcciones: Direccion[] = []; // Lista de direcciones registradas
  usuarioAutenticado: Usuario | null = null;

  constructor(
    private direccionService: DireccionService,
    private usuarioService: UsuarioService,
    private toastr: ToastrService
  ) {
    this.direccion = new Direccion(undefined, ''); // Inicializar la dirección vacía
  }

  ngOnInit(): void {
    // Obtener el usuario autenticado al iniciar el componente
    this.usuarioService.obtenerPerfil().subscribe({
      next: (usuario) => {
        this.usuarioAutenticado = usuario; // Guardar el usuario autenticado
        // Cargar las direcciones del usuario autenticado
        this.cargarDirecciones();
      },
      error: (error) => {
        console.error('Error al obtener el perfil del usuario:', error);
      },
    });
  }

  // Método para guardar o actualizar una dirección
  guardarServicio(): void {
    if (!this.direccion.direccion) {
      this.toastr.error(
        'Por favor, completa todos los campos antes de guardar',
        'Error'
      );
      return;
    }

    if (this.direccion.id) {
      // Si tiene ID, actualizamos la dirección existente
      this.direccionService
        .actualizarServicio(this.direccion.id, this.direccion)
        .subscribe({
          next: (response) => {
            this.toastr.success('Dirección actualizada con éxito', 'Éxito');
            this.cargarDirecciones(); // Recargar la lista de direcciones
            this.resetFormulario();
          },
          error: (error) => {
            this.toastr.error('Error al actualizar la dirección', 'Error');
            console.error('Error:', error);
          },
        });
    } else {
      // Si no tiene ID, creamos una nueva dirección
      this.direccionService.crearDireccion(this.direccion).subscribe({
        next: (response) => {
          this.toastr.success('Dirección creada con éxito', 'Éxito');
          this.cargarDirecciones(); // Recargar la lista de direcciones
          this.resetFormulario();
        },
        error: (error) => {
          this.toastr.error('Error al crear la dirección', 'Error');
          console.error('Error:', error);
        },
      });
    }
  }

  // Método para cargar las direcciones del usuario autenticado
  cargarDirecciones(): void {
    this.direccionService.listarDirecciones().subscribe({
      next: (direcciones) => {
        this.direcciones = direcciones;
      },
      error: (error) => {
        console.error('Error al cargar las direcciones', error);
      },
    });
  }

  // Método para eliminar una dirección
  eliminarDireccion(id: number): void {
    this.direccionService.eliminarDireccion(id).subscribe({
      next: () => {
        this.toastr.success('Dirección eliminada con éxito', 'Éxito');
        this.cargarDirecciones(); // Recargar la lista de direcciones
      },
      error: (error) => {
        this.toastr.error('Error al eliminar la dirección', 'Error');
        console.error('Error:', error);
      },
    });
  }

  // Método para editar una dirección
  editarDireccion(direccion: Direccion): void {
    this.direccion = { ...direccion }; // Copiar los datos de la dirección a editar
  }

  // Método para limpiar el formulario
  resetFormulario(): void {
    this.direccion = new Direccion(undefined, ''); // Resetear el formulario a una dirección vacía
  }
}
