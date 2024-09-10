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
  curso: Curso = {
    nombre: '',
    descripcion: '',
    precio: '',
    password: '',
    archivoPdf: undefined,
  };

  selectedFile: File | null = null;

  constructor(
    private cursoService: CursoService,
    private toastr: ToastrService // Inyectar ToastrService para las alertas
  ) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(): void {
    if (
      !this.curso.nombre ||
      !this.curso.descripcion ||
      !this.curso.precio ||
      !this.selectedFile
    ) {
      this.toastr.error(
        'Por favor, completa todos los campos y selecciona un archivo PDF',
        'Error'
      );
      return;
    }

    if (this.selectedFile) {
      this.cursoService.subirArchivo(this.selectedFile).subscribe({
        next: (response) => {
          const pdfUrl = response.url;

          const curso: Curso = {
            nombre: this.curso.nombre,
            descripcion: this.curso.descripcion,
            precio: this.curso.precio,
            password: this.curso.password,
            pdfUrl: pdfUrl,
          };

          this.cursoService.crearCurso(curso).subscribe({
            next: (curso) => {
              this.toastr.success('Curso creado con éxito', 'Éxito');
              this.resetForm(); // Limpiar el formulario después de éxito
            },
            error: (err) => {
              this.toastr.error('Error al crear el curso', 'Error');
              console.error('Error al crear curso:', err);
            },
          });
        },
        error: (err) => {
          this.toastr.error('Error al subir el archivo PDF', 'Error');
          console.error('Error al subir archivo:', err);
        },
      });
    } else {
      this.toastr.error('Por favor, selecciona un archivo PDF', 'Error');
    }
  }

  resetForm(): void {
    // Restablecer los valores del formulario y archivo seleccionado
    this.curso = {
      nombre: '',
      descripcion: '',
      precio: '',
      password: '',
      archivoPdf: undefined,
    };
    this.selectedFile = null; // Limpiar el archivo seleccionado
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
