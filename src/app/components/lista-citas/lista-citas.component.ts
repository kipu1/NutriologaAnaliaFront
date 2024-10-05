import { Component, OnInit } from '@angular/core';
import { Cita } from '../../models/cita';
import { CitaService } from '../../services/cita.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import dayGridPlugin from '@fullcalendar/daygrid'; // Correcto plugin
import interactionPlugin from '@fullcalendar/interaction'; // Correcto plugin
import { FullCalendarModule } from '@fullcalendar/angular';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lista-citas',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, FullCalendarModule],
  templateUrl: './lista-citas.component.html',
  styleUrl: './lista-citas.component.scss',
})
export class ListaCitasComponent implements OnInit {
  citas: Cita[] = [];
  citasFiltradas: Cita[] = [];
  filtroNombre: string = '';
  calendarOptions: any;
  mostrarModal: boolean = false; // Estado del modal
  citaSeleccionada: Cita | null = null; // Cita seleccionada

  constructor(
    private citaService: CitaService,
    private router: Router,
    private toastr: ToastrService // Inyectar ToastrService
  ) {}

  ngOnInit(): void {
    this.obtenerCitas();
    this.inicializarOpcionesCalendario();
  }

  inicializarOpcionesCalendario(): void {
    this.calendarOptions = {
      initialView: 'dayGridMonth',
      plugins: [dayGridPlugin, interactionPlugin],
      events: [],
      dateClick: this.handleDateClick.bind(this),
      eventClick: this.handleEventClick.bind(this),
    };
  }

  handleDateClick(arg: any): void {
    console.log('Clic en la fecha: ' + arg.dateStr);
  }

  handleEventClick(arg: any): void {
    const citaId = arg.event.extendedProps.id; // Asegúrate de que el ID esté correctamente asignado
    this.citaSeleccionada =
      this.citas.find((cita) => cita.id === citaId) || null;

    if (this.citaSeleccionada) {
      this.mostrarModal = true; // Mostrar el modal cuando se selecciona la cita
    }
  }

  cerrarModal(): void {
    this.mostrarModal = false;
    this.citaSeleccionada = null;
  }

  obtenerCitas(): void {
    this.citaService.listarCitas().subscribe({
      next: (response: Cita[]) => {
        this.citas = response;
        this.citasFiltradas = response;
        this.convertirCitasAEventos();
        this.toastr.success('Citas cargadas con éxito', 'Éxito'); // Notificación de éxito
      },
      error: (error) => {
        this.toastr.error('Error al obtener citas', 'Error'); // Notificación de error
        console.error('Error al obtener citas:', error);
      },
    });
  }

  convertirCitasAEventos(): void {
    const eventos = this.citas.map((cita) => {
      return {
        id: cita.id,
        title: cita.nombre,
        start: cita.fechaHora,
        extendedProps: { id: cita.id }, // Agregar ID como propiedad extendida para identificar la cita
        description: cita.motivo,
      };
    });
    this.calendarOptions.events = eventos;
  }

  eliminarCita(id: number | undefined): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta cita?')) {
      this.citaService.eliminarCita(id).subscribe({
        next: () => {
          this.toastr.success('Cita eliminada con éxito', 'Éxito'); // Notificación de éxito
          this.obtenerCitas();
          this.cerrarModal(); // Cierra el modal después de eliminar
        },
        error: (error) => {
          this.toastr.error('Error al eliminar la cita', 'Error'); // Notificación de error
          console.error('Error al eliminar la cita:', error);
        },
      });
    }
  }
}
