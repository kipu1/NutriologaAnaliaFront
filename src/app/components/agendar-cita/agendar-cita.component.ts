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
  fechaMinima: string;
  constructor(private citaService: CitaService) {
    const hoy = new Date();
    this.fechaMinima = hoy.toISOString().substring(0, 16);
  }

  agendarCita() {
    if (!this.validarFechaHora()) {
      alert(
        'La fecha y hora seleccionada no es válida. Por favor, elige otro horario.'
      );
      return;
    }

    this.cita.fechaHora = new Date(this.cita.fechaHora).toISOString();

    this.citaService.agendarCita(this.cita).subscribe({
      next: (response) => {
        alert('Cita agendada con éxito');
        this.cita = new Cita(undefined, '', '', '', '', ''); // Limpiar formulario
      },
      error: (error) => {
        if (error.status === 409) {
          alert(
            'La fecha y hora seleccionada ya está ocupada. Por favor, elige otro horario.'
          );
        } else {
          alert('Error al agendar la cita');
        }
      },
    });
  }

  validarFechaHora(): boolean {
    const fechaHoraSeleccionada = new Date(this.cita.fechaHora);
    const fechaHoraActual = new Date(); // Obtener la fecha y hora actual

    // Validar que la fecha seleccionada no sea anterior a la actual
    if (fechaHoraSeleccionada < fechaHoraActual) {
      return false;
    }

    const day = fechaHoraSeleccionada.getDay(); // 0: domingo, 1: lunes, ..., 6: sábado
    const hour = fechaHoraSeleccionada.getHours(); // Obtener la hora local
    const minutes = fechaHoraSeleccionada.getMinutes(); // Obtener los minutos locales

    // Restringir lunes (1), viernes (5) y domingo (0)
    if (day === 0 || day === 1 || day === 5) {
      return false;
    }

    // Permitir solo martes (2), miércoles (3) y jueves (4) de 17:30 a 20:30 (5:30pm a 8:30pm) en hora local
    if (
      (day === 2 || day === 3 || day === 4 || day === 6) &&
      hour >= 17 &&
      (hour < 20 || (hour === 20 && minutes <= 30))
    ) {
      return true;
    }

    // Otros días no permitidos o fuera del horario permitido
    return false;
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
