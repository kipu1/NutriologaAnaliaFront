import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CursoService } from '../../services/curso.service';
import { Router } from '@angular/router';
import { Curso } from '../../models/curso';

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

  constructor(private cursoService: CursoService, private router: Router) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }
  onSubmit(): void {
    if (this.selectedFile) {
      // Primero subimos el archivo PDF
      this.cursoService.subirArchivo(this.selectedFile).subscribe({
        next: (response) => {
          const pdfUrl = response.url; // Guardar la URL del archivo subido

          // Luego creamos el objeto curso y le asignamos la URL del archivo
          const curso: Curso = {
            nombre: this.curso.nombre,
            descripcion: this.curso.descripcion,
            precio: this.curso.precio,
            password: this.curso.password,
            pdfUrl: pdfUrl, // Asignar la URL del archivo al curso
          };

          // Enviar el curso con la URL del PDF
          this.cursoService.crearCurso(curso).subscribe({
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
        },
        error: (err) => {
          console.error('Error al subir archivo:', err);
          alert('Error al subir archivo');
        },
      });
    } else {
      alert('Por favor, selecciona un archivo PDF');
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
}
