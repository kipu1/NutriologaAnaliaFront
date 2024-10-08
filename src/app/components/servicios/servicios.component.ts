import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Servicio } from '../../models/servicio';
import { ServicioService } from '../../services/servicio.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './servicios.component.html',
  styleUrl: './servicios.component.scss',
})
export class ServiciosComponent {
  servicio: Servicio;
  usuarioAutenticado: Usuario | null = null; // Variable para almacenar el usuario autenticado

  constructor(
    private servicioService: ServicioService,
    private usuarioService: UsuarioService, // Inyectar el UsuarioService para obtener el usuario autenticado
    private toastr: ToastrService // Inyectar ToastrService para las alertas
  ) {
    // Obtener el usuario autenticado al iniciar el componente
    this.usuarioService.obtenerPerfil().subscribe({
      next: (usuario) => {
        this.usuarioAutenticado = usuario; // Guardar el usuario autenticado
        // Inicializar el servicio con el usuario autenticado
        this.servicio = new Servicio(
          undefined,
          '',
          '',
          this.usuarioAutenticado
        );
      },
      error: (error) => {
        console.error('Error al obtener el perfil del usuario:', error);
      },
    });

    // Inicializar el servicio con usuario `null` mientras obtenemos el usuario autenticado
    this.servicio = new Servicio(undefined, '', '', null);
  }

  guardarServicio() {
    // Validar si los campos de título y descripción están vacíos
    if (!this.servicio.titulo || !this.servicio.descripcion) {
      this.toastr.error(
        'Por favor, completa todos los campos antes de guardar',
        'Error'
      );
      return; // Si están vacíos, no proceder con la creación o actualización
    }

    if (this.servicio.id) {
      // Si el servicio ya tiene ID, lo actualizamos
      this.servicioService
        .actualizarServicio(this.servicio.id, this.servicio)
        .subscribe({
          next: (response) => {
            this.toastr.success('Servicio actualizado con éxito', 'Éxito');
            this.resetForm(); // Limpiar el formulario
          },
          error: (error) => {
            this.toastr.error('Error al actualizar el servicio', 'Error');
            console.error('Error:', error);
          },
        });
    } else {
      // Si no tiene ID, creamos un nuevo servicio
      this.servicioService.crearServicio(this.servicio).subscribe({
        next: (response) => {
          this.toastr.success('Servicio creado con éxito', 'Éxito');
          this.resetForm(); // Limpiar el formulario
        },
        error: (error) => {
          this.toastr.error('Error al crear el servicio', 'Error');
          console.error('Error:', error);
        },
      });
    }
  }

  resetForm() {
    // Reinicia el formulario a su estado inicial
    this.servicio = new Servicio(undefined, '', '', this.usuarioAutenticado);
  }
}
/*

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
    window.open(url, '_blank'); // Abrir en nueva ventana o pestaña
  }
}*/
