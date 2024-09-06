import { Component, OnInit } from '@angular/core';
import { Cita } from '../../models/cita';
import { CitaService } from '../../services/cita.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-citas',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './lista-citas.component.html',
  styleUrl: './lista-citas.component.scss',
})
export class ListaCitasComponent implements OnInit {
  citas: Cita[] = [];
  citasFiltradas: Cita[] = [];
  filtroNombre: string = '';
  editandoCita: boolean = false;

  constructor(private citaService: CitaService, private router: Router) {}

  ngOnInit(): void {
    this.obtenerCitas();
  }

  // Obtener todas las citas
  obtenerCitas(): void {
    this.citaService.listarCitas().subscribe({
      next: (response: Cita[]) => {
        this.citas = response;
        this.citasFiltradas = response;
      },
      error: (error) => {
        console.error('Error al obtener citas:', error);
      },
    });
  }
  editarCita(id: number | undefined): void {
    if (id !== undefined) {
      this.router.navigate([`/actualizar-cita/${id}`]); // Redirigir con el ID correcto
    } else {
      console.error('ID de la cita es undefined');
    }
  }

  // Buscar citas por nombre
  buscarCitas(): void {
    this.citasFiltradas = this.citas.filter((cita) =>
      cita.nombre.toLowerCase().includes(this.filtroNombre.toLowerCase())
    );
  }

  // Eliminar una cita
  eliminarCita(id: number | undefined): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta cita?')) {
      this.citaService.eliminarCita(id).subscribe({
        next: () => {
          alert('Cita eliminada con éxito');
          this.obtenerCitas(); // Refrescar la lista después de eliminar
        },
        error: (error) => {
          console.error('Error al eliminar la cita:', error);
        },
      });
    }
  }

  // Editar una cita (preparar para actualizar)

  // Actualizar una cita
}
