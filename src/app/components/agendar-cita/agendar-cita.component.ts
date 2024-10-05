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
  fechaSeleccionada: string = ''; // Inicializamos como un string vacío
  horaSeleccionada: string = ''; // Inicializamos como un string vacío
  horasDisponibles: any[] = []; // Para almacenar las horas disponibles con su estado (ocupada o no)

  fechaMinima: string;

  constructor(
    private citaService: CitaService,
    private toastr: ToastrService // Inyectar ToastrService
  ) {
    const hoy = new Date();
    this.fechaMinima = hoy.toISOString().substring(0, 16);
  }

  agendarCita() {
    // Asegúrate de que la fecha y la hora se concatenan correctamente en el formato "yyyy-MM-ddTHH:mm:ss"
    const fechaHoraCompleta = `${this.fechaSeleccionada}T${this.horaSeleccionada}:00`;

    // Asignar fechaHora a la cita
    this.cita.fechaHora = fechaHoraCompleta;

    if (this.validarFechaHora()) {
      this.citaService.agendarCita(this.cita).subscribe({
        next: () => {
          this.toastr.success('Cita agendada con éxito', 'Éxito');
          this.cita = new Cita(undefined, '', '', '', '', ''); // Limpiar el formulario
          window.location.reload(); // Refrescar la página
        },
        error: () => {
          this.toastr.error('Error al agendar la cita.', 'Error');
        },
      });
    }
  }

  cargarHorasDisponibles() {
    // Convertir la fecha seleccionada correctamente a formato UTC
    const fecha = new Date(`${this.fechaSeleccionada}T00:00:00`);
    const diaSemana = fecha.getUTCDay(); // Obtener el día en formato UTC

    // Aquí es donde colocas los console.log para depurar

    // Limpiar las horas disponibles al cambiar la fecha
    this.horasDisponibles = [];

    // Solo mostrar turnos para martes (2), miércoles (3), jueves (4) y sábado (6)
    if (
      diaSemana === 2 ||
      diaSemana === 3 ||
      diaSemana === 4 ||
      diaSemana === 6
    ) {
      if (diaSemana === 2 || diaSemana === 3 || diaSemana === 4) {
        const turnosEntreSemana = [
          { horaTexto: '5:30 PM', hora: '17:30' },
          { horaTexto: '6:00 PM', hora: '18:00' },
          { horaTexto: '6:30 PM', hora: '18:30' },
          { horaTexto: '7:00 PM', hora: '19:00' },
          { horaTexto: '7:30 PM', hora: '19:30' },
          { horaTexto: '8:00 PM', hora: '20:00' },
        ];

        this.citaService
          .verificarHorasOcupadas(this.fechaSeleccionada)
          .subscribe((horasOcupadas: string[]) => {
            this.horasDisponibles = turnosEntreSemana.map((turno) => ({
              ...turno,
              ocupada: horasOcupadas.includes(turno.hora),
            }));
          });
      } else if (diaSemana === 6) {
        const turnosSabado = [
          { horaTexto: '10:00 AM', hora: '10:00' },
          { horaTexto: '10:30 AM', hora: '10:30' },
          { horaTexto: '11:00 AM', hora: '11:00' },
          { horaTexto: '11:30 AM', hora: '11:30' },
          { horaTexto: '12:00 PM', hora: '12:00' },
          { horaTexto: '12:30 PM', hora: '12:30' },
          { horaTexto: '1:00 PM', hora: '13:00' },
          { horaTexto: '1:30 PM', hora: '13:30' },
          { horaTexto: '2:00 PM', hora: '14:00' },
          { horaTexto: '2:30 PM', hora: '14:30' },
          { horaTexto: '3:00 PM', hora: '15:00' },
          { horaTexto: '3:30 PM', hora: '15:30' },
          { horaTexto: '4:00 PM', hora: '16:00' },
          { horaTexto: '4:30 PM', hora: '16:30' },
          { horaTexto: '5:00 PM', hora: '17:00' },
          { horaTexto: '5:30 PM', hora: '17:30' },
          { horaTexto: '6:00 PM', hora: '18:00' },
          { horaTexto: '6:30 PM', hora: '18:30' },
          { horaTexto: '7:00 PM', hora: '19:00' },
          { horaTexto: '7:30 PM', hora: '19:30' },
          { horaTexto: '8:00 PM', hora: '20:00' },
          { horaTexto: '8:30 PM', hora: '20:30' },
        ];

        this.citaService
          .verificarHorasOcupadas(this.fechaSeleccionada)
          .subscribe((horasOcupadas: string[]) => {
            this.horasDisponibles = turnosSabado.map((turno) => ({
              ...turno,
              ocupada: horasOcupadas.includes(turno.hora),
            }));
          });
      }
    } else {
      // Si el día es inválido (domingo, lunes o viernes), no mostrar ningún turno
      this.horasDisponibles = []; // Asegurar que no se muestren horas para días inválidos
      this.toastr.error(
        'Solo se pueden agendar citas los martes, miércoles, jueves o sábados.',
        'Error'
      );
    }
  }

  validarFechaHora(): boolean {
    // Aquí formamos el objeto Date usando la fecha y la hora seleccionada
    const fechaHoraSeleccionada = new Date(
      `${this.fechaSeleccionada}T${this.horaSeleccionada}:00`
    );
    const day = fechaHoraSeleccionada.getUTCDay(); // Obtener el día en formato UTC
    const hour = fechaHoraSeleccionada.getHours();
    const minutes = fechaHoraSeleccionada.getMinutes();

    console.log('Día de la semana:', day); // Depuración para verificar el día
    console.log('Hora seleccionada:', hour, minutes); // Depuración para verificar la hora

    // Verificar los días permitidos (martes, miércoles, jueves, sábado)
    if (day !== 2 && day !== 3 && day !== 4 && day !== 6) {
      this.toastr.error(
        'Solo se pueden agendar citas los martes, miércoles, jueves o sábado.',
        'Error'
      );
      return false;
    }

    // Verificar los horarios permitidos para entre semana y sábados
    const turnosValidosEntreSemana = [
      { hour: 17, minutes: 30 },
      { hour: 18, minutes: 0 },
      { hour: 18, minutes: 30 },
      { hour: 19, minutes: 0 },
      { hour: 19, minutes: 30 },
      { hour: 20, minutes: 0 },
    ];

    const turnosValidosSabado = [
      { hour: 10, minutes: 0 },
      { hour: 10, minutes: 30 },
      { hour: 11, minutes: 0 },
      { hour: 11, minutes: 30 },
      { hour: 12, minutes: 0 },
      { hour: 12, minutes: 30 },
      { hour: 13, minutes: 0 },
      { hour: 13, minutes: 30 },
      { hour: 14, minutes: 0 },
      { hour: 14, minutes: 30 },
      { hour: 15, minutes: 0 },
      { hour: 15, minutes: 30 },
      { hour: 16, minutes: 0 },
      { hour: 16, minutes: 30 },
      { hour: 17, minutes: 0 },
      { hour: 17, minutes: 30 },
      { hour: 18, minutes: 0 },
      { hour: 18, minutes: 30 },
      { hour: 19, minutes: 0 },
      { hour: 19, minutes: 30 },
      { hour: 20, minutes: 0 },
    ];

    let turnoValido = false;
    if (day === 6) {
      // Si es sábado
      turnoValido = turnosValidosSabado.some(
        (turno) => turno.hour === hour && turno.minutes === minutes
      );
    } else {
      // Si es entre semana
      turnoValido = turnosValidosEntreSemana.some(
        (turno) => turno.hour === hour && turno.minutes === minutes
      );
    }

    if (!turnoValido) {
      this.toastr.error('Por favor selecciona un turno válido.', 'Error');
      return false;
    }

    return true; // Si todo es válido, se puede proceder
  }
}
