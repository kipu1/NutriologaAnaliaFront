import { Component } from '@angular/core';
import { Cita } from '../../models/cita';
import { CitaService } from '../../services/cita.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

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

  constructor(
    private citaService: CitaService,
    private toastr: ToastrService // Inyectar ToastrService
  ) {
    const hoy = new Date();
    this.fechaMinima = hoy.toISOString().substring(0, 16);
  }

  agendarCita() {
    if (this.validarFechaHora()) {
      // Lógica de agendar cita solo si la fecha y hora son válidas
      this.cita.fechaHora = new Date(this.cita.fechaHora).toISOString();

      this.citaService.agendarCita(this.cita).subscribe({
        next: (response) => {
          this.toastr.success('Cita agendada con éxito', 'Éxito');
          this.cita = new Cita(undefined, '', '', '', '', ''); // Limpiar formulario
        },
        error: (error) => {
          if (error.status === 409) {
            this.toastr.error(
              'La fecha y hora seleccionada ya está ocupada.',
              'Error'
            );
          } else {
            this.toastr.error('Error al agendar la cita.', 'Error');
          }
        },
      });
    }
  }
  validarFechaHora(): boolean {
    const fechaHoraSeleccionada = new Date(this.cita.fechaHora);
    const day = fechaHoraSeleccionada.getDay(); // 0: domingo, 1: lunes, ..., 6: sábado
    const hour = fechaHoraSeleccionada.getHours();
    const minutes = fechaHoraSeleccionada.getMinutes();

    // Verificar que sea martes (2), miércoles (3), jueves (4) o sábado (6)
    if (day !== 2 && day !== 3 && day !== 4 && day !== 6) {
      this.toastr.error(
        'Solo se pueden agendar citas los martes, miércoles, jueves',
        'Error'
      );
      return false;
    }

    // Validar los turnos exactos
    const turnosValidos = [
      { hour: 17, minutes: 30 }, // 5:30 PM
      { hour: 18, minutes: 0 }, // 6:00 PM
      { hour: 18, minutes: 30 }, // 6:30 PM
      { hour: 19, minutes: 0 }, // 7:00 PM
      { hour: 19, minutes: 30 }, // 7:30 PM
      { hour: 20, minutes: 0 }, // 8:00 PM
    ];

    const turnoValido = turnosValidos.some(
      (turno) => turno.hour === hour && turno.minutes === minutes
    );

    if (!turnoValido) {
      this.toastr.error(
        'Por favor selecciona un turno válido: de 5:30 PM a 8:30 PM',
        'Error'
      );
      return false;
    }

    return true;
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
