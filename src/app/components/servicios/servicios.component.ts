import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './servicios.component.html',
  styleUrl: './servicios.component.scss',
})
export class ServiciosComponent {
  servicios = [
    {
      titulo: 'PESO/OPTIMIZACIÓN COMPOSICIÓN CORPORAL',
      descripcion: 'Pérdida de grasa, aumento de masa muscular',
    },
    {
      titulo: 'CAMBIO DE HÁBITOS',
      descripcion:
        'Mejora tu salud y tu relación con los alimentos desde la raíz',
    },
    {
      titulo: 'SÍNDROME METABOLICO',
      descripcion:
        'Diabetes II, Hipertensión, Dislipidemias, Enfermedad Cardiovascular...',
    },
    {
      titulo: 'SALUD HORMONAL FEMENINA',
      descripcion:
        'Alimentación y ciclo menstrual, desbalances hormonales, fertilidad...',
    },
  ];

  // Función para redirigir a WhatsApp con mensaje personalizado según el servicio
  contactarPorWhatsApp(titulo: string) {
    const numeroWhatsApp = '593987851604'; // Número con código de país
    const mensaje = encodeURIComponent(
      `Buen día, estoy interesado en el servicio de: ${titulo}. ¿Me puede proporcionar más información?`
    );
    const url = `https://wa.me/${numeroWhatsApp}?text=${mensaje}`;
    window.location.href = url; // Cambia window.open a window.location.href
  }
}
