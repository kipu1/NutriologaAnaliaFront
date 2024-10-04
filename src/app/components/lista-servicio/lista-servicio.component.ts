import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import { Servicio } from '../../models/servicio';
import { ServicioService } from '../../services/servicio.service';

@Component({
  selector: 'app-lista-servicio',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, FullCalendarModule],
  templateUrl: './lista-servicio.component.html',
  styleUrl: './lista-servicio.component.scss',
})
export class ListaServicioComponent {
  servicios: any[] = [];

  constructor(private servicioService: ServicioService) {}

  ngOnInit(): void {
    this.obtenerServicios();
  }

  obtenerServicios(): void {
    this.servicioService.listarServicios().subscribe({
      next: (servicios) => {
        this.servicios = servicios;
      },
      error: (error) => {
        console.error('Error al cargar las servicios', error);
      },
    });
  }
  contactarPorWhatsApp(titulo: string, telefono: string): void {
    const numeroWhatsApp = `593${telefono}`; // Código de país + número
    const mensaje = encodeURIComponent(
      `Buen día, estoy interesado en el servicio de: ${titulo}. ¿Me puede proporcionar más información?`
    );
    const url = `https://wa.me/${numeroWhatsApp}?text=${mensaje}`;
    window.open(url, '_blank'); // Abrir en nueva ventana o pestaña
  }
}
