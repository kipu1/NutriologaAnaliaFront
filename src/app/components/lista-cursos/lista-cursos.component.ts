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

  constructor(private cursoService: CursoService) {}

  ngOnInit(): void {
    this.cursoService.listarCursos().subscribe(
      (cursos) => {
        this.cursos = cursos;
      },
      (error) => {
        console.error('Error al obtener la lista de cursos', error);
      }
    );
  }
  descargarCurso(curso: Curso): void {
    if (curso.password) {
      this.cursoService.descargarCurso(curso.id, curso.password).subscribe(
        (response: Blob) => {
          const a = document.createElement('a');
          const objectUrl = URL.createObjectURL(response);
          a.href = objectUrl;
          a.download = curso.nombre; // El nombre del archivo para la descarga
          a.click();
          URL.revokeObjectURL(objectUrl);
          curso.password = ''; // Reiniciar la contraseña después de descargar
        },
        (error) => {
          if (error.status === 403) {
            alert('Contraseña incorrecta');
          } else {
            alert('Error al descargar el archivo');
          }
          curso.password = ''; // Reiniciar la contraseña también en caso de error
        }
      );
    } else {
      alert('Por favor, ingrese la contraseña');
    }
  }
}
