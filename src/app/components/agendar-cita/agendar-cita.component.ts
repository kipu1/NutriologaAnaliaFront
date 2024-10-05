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
  horariosOcupados: string[] = [];
  horariosDisponibles: string[] = [];
  fechaSeleccionada: string = ''; // Para guardar la fecha seleccionada
  horaSeleccionada: string = ''; // Para guardar la hora seleccionada

  constructor(
    private citaService: CitaService,
    private toastr: ToastrService // Inyectar ToastrService
  ) {
    const hoy = new Date();
    this.fechaMinima = hoy.toISOString().substring(0, 16);
  }

  ngOnInit() {}

  cargarHorariosOcupados() {
    if (!this.fechaSeleccionada) {
      return; // Asegurarse de que haya una fecha seleccionada antes de cargar los horarios
    }
    this.citaService.obtenerHorariosOcupados(this.fechaSeleccionada).subscribe({
      next: (response) => {
        this.horariosOcupados = response; // Cargar los horarios ocupados
        this.filtrarHorariosDisponibles(); // Filtrar los horarios disponibles
      },
      error: () => {
        this.toastr.error('Error al cargar los horarios ocupados.', 'Error');
      },
    });
  }

  filtrarHorariosDisponibles() {
    const day = new Date(this.fechaSeleccionada).getDay();

    // Horarios válidos para días entre semana y sábados
    const turnosValidosEntreSemana: string[] = [
      '17:30',
      '18:00',
      '18:30',
      '19:00',
      '19:30',
      '20:00',
    ];
    const turnosValidosSabado: string[] = [
      '10:00',
      '10:30',
      '11:00',
      '11:30',
      '12:00',
      '12:30',
      '13:00',
      '13:30',
      '14:00',
      '14:30',
      '15:00',
      '15:30',
      '16:00',
      '16:30',
      '17:00',
      '17:30',
      '18:00',
      '18:30',
      '19:00',
      '19:30',
      '20:00',
    ];

    let turnosValidos: string[] = [];
    if (day === 6) {
      turnosValidos = turnosValidosSabado;
    } else if (day === 2 || day === 3 || day === 4) {
      turnosValidos = turnosValidosEntreSemana;
    }

    this.horariosDisponibles = turnosValidos.filter(
      (turno) => !this.horariosOcupados.includes(turno)
    );
  }

  agendarCita() {
    if (this.validarFechaHora()) {
      // Crear una cadena de fecha y hora en el formato local sin UTC
      const fechaHoraCompleta = new Date(
        `${this.fechaSeleccionada}T${this.horaSeleccionada}:00`
      );

      // Guardar la fecha y hora sin cambiar la zona horaria
      this.cita.fechaHora = this.formatoFechaLocal(fechaHoraCompleta);

      this.citaService.agendarCita(this.cita).subscribe({
        next: () => {
          this.toastr.success('Cita agendada con éxito', 'Éxito');
          this.cita = new Cita(undefined, '', '', '', '', ''); // Limpiar el formulario
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
    if (!this.fechaSeleccionada || !this.horaSeleccionada) {
      this.toastr.error('Debe seleccionar una fecha y hora válidas.', 'Error');
      return false;
    }

    if (!this.horariosDisponibles.includes(this.horaSeleccionada)) {
      this.toastr.error('El horario seleccionado no está disponible.', 'Error');
      return false;
    }

    return true;
  }

  // Formatear la fecha local sin la zona horaria UTC
  formatoFechaLocal(fecha: Date): string {
    const anio = fecha.getFullYear();
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Mes en formato 2 dígitos
    const dia = fecha.getDate().toString().padStart(2, '0');
    const hora = fecha.getHours().toString().padStart(2, '0');
    const minutos = fecha.getMinutes().toString().padStart(2, '0');

    return `${anio}-${mes}-${dia}T${hora}:${minutos}:00`;
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
