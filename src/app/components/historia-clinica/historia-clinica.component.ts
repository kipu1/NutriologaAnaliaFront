import { Component } from '@angular/core';
import { CitaService } from '../../services/cita.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-historia-clinica',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './historia-clinica.component.html',
  styleUrl: './historia-clinica.component.scss',
})
export class HistoriaClinicaComponent {
  cedula: string = '';
  historiaClinica: any[] = [];
  mensajeError: string = ''; // Para gestionar el mensaje de error cuando no hay resultados

  constructor(private citaService: CitaService) {}

  buscarHistoriaClinica() {
    this.mensajeError = ''; // Reiniciar el mensaje de error en cada búsqueda
    this.historiaClinica = []; // Limpiar el historial previo antes de buscar

    this.citaService.obtenerCitasPorCedula(this.cedula).subscribe(
      (citas) => {
        if (citas.length > 0) {
          this.historiaClinica = citas; // Actualizar las citas encontradas
        } else {
          this.mensajeError = 'No se encontraron citas para esta cédula.';
          this.historiaClinica = []; // Limpiar las citas si no se encuentra nada
        }
      },
      (error) => {
        console.error('Error al obtener la historia clínica', error);
        this.mensajeError = 'Error al buscar la historia clínica.';
        this.historiaClinica = []; // Limpiar las citas si ocurre un error
      }
    );
  }

  // Restablecer los resultados si la cédula cambia
  limpiarResultados() {
    this.historiaClinica = [];
    this.mensajeError = '';
  }
}
