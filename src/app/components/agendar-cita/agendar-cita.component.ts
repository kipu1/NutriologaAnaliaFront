import { Component } from '@angular/core';
import { Cita } from '../../models/cita';
import { CitaService } from '../../services/cita.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-agendar-cita',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './agendar-cita.component.html',
  styleUrl: './agendar-cita.component.scss',
})
export class AgendarCitaComponent {
  // Inicia la cita con `fechaHora` como un objeto `Date`.
  cita: Cita = new Cita(undefined, '', '', '', '', '');

  constructor(private citaService: CitaService) {}
  agendarCita() {
    // Convertir la fecha a formato ISO antes de enviar al backend
    this.cita.fechaHora = new Date(this.cita.fechaHora).toISOString();

    this.citaService.agendarCita(this.cita).subscribe({
      next: (response) => {
        alert('Cita agendada con éxito');
        this.cita = new Cita(undefined, '', '', '', '', ''); // Limpiar formulario
      },
      error: (error) => {
        if (error.status === 409) {
          // Si el backend retorna 409 (CONFLICT), la fecha y hora están ocupadas
          alert(
            'La fecha y hora seleccionada ya está ocupada. Por favor, elige otro horario.'
          );
        } else {
          // Manejo de otros errores
          alert('Error al agendar la cita');
        }
        console.error('Error:', error);
      },
    });
  }
}
/* agendarCita() {
    // Si `fechaHora` viene de un input en formato string, convertirlo a objeto Date
    if (typeof this.cita.fechaHora === 'string') {
      this.cita.fechaHora = new Date(this.cita.fechaHora);
    }

    this.citaService.agendarCita(this.cita).subscribe({
      next: (response) => {
        alert('Cita agendada con éxito');
        // Limpia el formulario después de agendar la cita
        this.cita = new Cita(undefined, '', '', new Date(), ''); // Usar `new Date()` para reiniciar la fecha
      },
      error: (error) => {
        alert('Error al agendar la cita');
      },
    });
  }}*/
