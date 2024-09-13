import { Component } from '@angular/core';
import { Servicio } from '../../models/servicio';
import { ServicioService } from '../../services/servicio.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ver-lista-servicio',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './ver-lista-servicio.component.html',
  styleUrl: './ver-lista-servicio.component.scss',
})
export class VerListaServicioComponent {
  servicios: Servicio[] = [];
  servicioSeleccionado: Servicio | null = null;

  constructor(private servicioService: ServicioService) {}

  ngOnInit(): void {
    this.cargarServicios();
  }

  cargarServicios(): void {
    this.servicioService.listarServicios().subscribe((data) => {
      console.log('Servicios cargados:', data); // Verificar si el ID está presente
      this.servicios = data;
    });
  }
  abrirModalActualizar(servicio: Servicio): void {
    if (servicio.id !== undefined) {
      this.servicioSeleccionado = { ...servicio }; // Clonar el objeto solo si el ID está presente
    } else {
      console.error('El servicio no tiene un ID:', servicio); // Verificar si el ID está presente
      alert('El servicio no tiene un ID válido.');
    }
  }
  cerrarModal(): void {
    this.servicioSeleccionado = null;
  }

  actualizarServicio(): void {
    if (
      this.servicioSeleccionado &&
      this.servicioSeleccionado.id !== undefined
    ) {
      this.servicioService
        .actualizarServicio(
          this.servicioSeleccionado.id,
          this.servicioSeleccionado
        )
        .subscribe(
          (updatedServicio) => {
            alert('Servicio actualizado exitosamente');
            this.cargarServicios();
            this.cerrarModal();
          },
          (error) => {
            alert('Error al actualizar el servicio');
          }
        );
    } else {
      alert('El ID del servicio no está disponible');
    }
  }

  eliminarServicio(id: number | undefined): void {
    if (id !== undefined) {
      console.log('Eliminando servicio con ID:', id); // Verificación
      if (confirm('¿Estás seguro de que quieres eliminar este servicio?')) {
        this.servicioService.eliminarServicio(id).subscribe(
          () => {
            alert('Servicio eliminado exitosamente');
            this.cargarServicios(); // Vuelve a cargar la lista de servicios
          },
          (error) => {
            alert('Error al eliminar el servicio');
          }
        );
      }
    } else {
      console.error('El ID del servicio es undefined:', id);
      alert('El ID del servicio no está disponible');
    }
  }
}
