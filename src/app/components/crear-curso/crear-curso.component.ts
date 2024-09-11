import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CursoService } from '../../services/curso.service';
import { Router } from '@angular/router';
import { Curso } from '../../models/curso';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-crear-curso',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './crear-curso.component.html',
  styleUrl: './crear-curso.component.scss',
})
export class CrearCursoComponent {
  nombre: string = '';
  descripcion: string = '';
  precio: string = '';
  password: string = '';
  selectedFile: File | null = null;

  constructor(
    private cursoService: CursoService,
    private toastr: ToastrService
  ) {} // Inyectar ToastrService

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  crearCurso(): void {
    if (this.nombre && this.descripcion && this.precio && this.selectedFile) {
      const formData = new FormData();
      formData.append('nombre', this.nombre);
      formData.append('descripcion', this.descripcion);
      formData.append('precio', this.precio);
      formData.append('password', this.password || ''); // Password opcional
      formData.append('file', this.selectedFile);

      // Llamar al método del servicio que ahora incluye los headers
      this.cursoService.crearCurso(formData).subscribe(
        (response) => {
          this.toastr.success('Curso creado exitosamente', 'Éxito'); // Reemplazar alert con Toastr
          this.limpiarFormulario();
        },
        (error) => {
          this.toastr.error('Error al crear el curso', 'Error'); // Reemplazar alert con Toastr
        }
      );
    } else {
      this.toastr.error(
        'Por favor, complete todos los campos y seleccione un archivo',
        'Error'
      ); // Reemplazar alert con Toastr
    }
  }

  limpiarFormulario(): void {
    this.nombre = '';
    this.descripcion = '';
    this.precio = '';
    this.password = '';
    this.selectedFile = null;
  }
}
/*onSubmit(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('nombre', this.curso.nombre);
      formData.append('descripcion', this.curso.descripcion);
      formData.append('precio', this.curso.precio);
      formData.append('file', this.selectedFile);

      this.cursoService.crearCurso(formData).subscribe({
        next: (curso) => {
          console.log('Curso creado con éxito:', curso);
          alert('Curso creado con éxito');
          this.router.navigate(['/ver-cursos']); // Redirigir a la lista de cursos
        },
        error: (err) => {
          console.error('Error al crear curso:', err);
          alert('Error al crear el curso');
        },
      });
    } else {
      alert('Por favor, selecciona un archivo PDF');
    }
  }*/
