import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Curso } from '../../models/curso';
import { CursoService } from '../../services/curso.service';

@Component({
  selector: 'app-lista-cursos',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './lista-cursos.component.html',
  styleUrl: './lista-cursos.component.scss',
})
export class ListaCursosComponent implements OnInit {
  cursos: Curso[] = [];
  passwords: string[] = []; // Para almacenar las contraseñas temporalmente

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
}
