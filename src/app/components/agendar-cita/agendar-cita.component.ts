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
    // Validar que todos los campos estén completos antes de agendar la cita
    if (
      !this.cita.nombre ||
      !this.cita.cedula ||
      !this.cita.telefono ||
      !this.cita.fechaHora ||
      !this.cita.motivo
    ) {
      this.toastr.error('Por favor, completa todos los campos.', 'Error');
      return;
    }

    this.cita.fechaHora = new Date(this.cita.fechaHora).toISOString(); // Asegurarse de que la fecha se envía en el formato correcto

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

  validarFechaHora(): boolean {
    const fechaHoraSeleccionada = new Date(this.cita.fechaHora);
    const fechaHoraActual = new Date();

    if (fechaHoraSeleccionada < fechaHoraActual) {
      return false;
    }

    const day = fechaHoraSeleccionada.getDay(); // 0: domingo, 1: lunes, ..., 6: sábado
    const hour = fechaHoraSeleccionada.getHours();
    const minutes = fechaHoraSeleccionada.getMinutes();

    if (day === 0 || day === 1 || day === 5) {
      return false;
    }

    if (
      (day === 2 || day === 3 || day === 4 || day === 6) &&
      hour >= 17 &&
      (hour < 20 || (hour === 20 && minutes <= 30))
    ) {
      return true;
    }

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
