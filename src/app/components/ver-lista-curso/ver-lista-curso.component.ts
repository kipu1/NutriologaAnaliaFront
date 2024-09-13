import { Component } from '@angular/core';
import { Curso } from '../../models/curso';
import { CursoService } from '../../services/curso.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ver-lista-curso',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './ver-lista-curso.component.html',
  styleUrl: './ver-lista-curso.component.scss',
})
export class VerListaCursoComponent {
  cursos: Curso[] = [];
  passwords: string[] = [];
  cursoSeleccionado: Curso | null = null; // Para manejar el curso que se va a actualizar
  archivoSeleccionado: File | null = null; // Para almacenar el archivo seleccionado

  constructor(private cursoService: CursoService) {}

  ngOnInit(): void {
    this.cargarCursos();
  }

  cargarCursos(): void {
    this.cursoService.listarCursos().subscribe((data) => {
      this.cursos = data;
      this.passwords = new Array(this.cursos.length); // Inicializa el array para las contraseñas
    });
  }

  onFileSelected(event: any): void {
    this.archivoSeleccionado = event.target.files[0];
  }

  // Función para actualizar un curso
  actualizarCurso(): void {
    if (this.cursoSeleccionado) {
      const cursoFormData = new FormData();
      cursoFormData.append('nombre', this.cursoSeleccionado.nombre);
      cursoFormData.append('descripcion', this.cursoSeleccionado.descripcion);
      cursoFormData.append('precio', this.cursoSeleccionado.precio.toString());
      cursoFormData.append('password', this.cursoSeleccionado.password || '');

      // Si se seleccionó un archivo, lo añadimos a FormData
      if (this.archivoSeleccionado) {
        cursoFormData.append('file', this.archivoSeleccionado);
      }

      this.cursoService
        .actualizarCurso(this.cursoSeleccionado.id, cursoFormData)
        .subscribe(
          (updatedCurso) => {
            alert('Curso actualizado exitosamente');
            this.cargarCursos(); // Volver a cargar los cursos después de actualizar
            this.cerrarModal(); // Cerrar el modal
          },
          (error) => {
            alert('Error al actualizar el curso');
          }
        );
    }
  }
  cerrarModal(): void {
    this.cursoSeleccionado = null;
  }

  descargarCurso(curso: Curso, index: number): void {
    const password = this.passwords[index]; // Obtiene la contraseña temporal
    if (password) {
      this.cursoService.descargarCurso(curso.id, password).subscribe(
        (response: Blob) => {
          const a = document.createElement('a');
          const objectUrl = URL.createObjectURL(response);
          a.href = objectUrl;
          a.download = curso.nombre; // El nombre del archivo para la descarga
          a.click();
          URL.revokeObjectURL(objectUrl);
          this.passwords[index] = ''; // Limpia la contraseña después de la descarga
        },
        (error) => {
          if (error.status === 403) {
            alert('Contraseña incorrecta');
          } else {
            alert('Error al descargar el archivo');
          }
        }
      );
    } else {
      alert('Por favor, ingrese la contraseña');
    }
  }

  // Función para eliminar un curso
  eliminarCurso(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar este curso?')) {
      this.cursoService.eliminarCurso(id).subscribe(
        () => {
          alert('Curso eliminado exitosamente');
          this.cargarCursos(); // Vuelve a cargar la lista de cursos
        },
        (error) => {
          alert('Error al eliminar el curso');
        }
      );
    }
  }

  // Abrir el modal con los datos del curso seleccionado
  abrirModalActualizar(curso: Curso): void {
    this.cursoSeleccionado = { ...curso }; // Clonar el objeto curso para evitar modificar los datos directamente
  }
}
