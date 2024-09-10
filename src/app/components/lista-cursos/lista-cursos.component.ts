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
  passwordInput: string = ''; // Variable para la contraseña

  constructor(private cursoService: CursoService) {}

  ngOnInit(): void {
    this.cursoService.getCursos().subscribe({
      next: (cursos) => {
        this.cursos = cursos;
        console.log('Cursos obtenidos:', cursos); // Verifica la respuesta en la consola
      },
      error: (error) => {
        console.error('Error al obtener los cursos:', error);
        alert('Error al obtener los cursos.');
      },
    });
  }

  mostrarModalPassword(cursoId: number): void {
    const password = prompt('Introduce la contraseña para descargar el PDF');
    if (password) {
      this.verificarPassword(cursoId, password);
    }
  }
  verificarPassword(id: number, password: string): void {
    this.cursoService.verificarPassword(id, password).subscribe({
      next: (response) => {
        const pdfUrl = response.url;
        console.log('PDF URL:', pdfUrl); // Verifica si la URL es correcta
        window.open(`http://localhost:8080${pdfUrl}`, '_blank'); // Asegúrate de que la URL sea correcta
      },
      error: (error) => {
        alert('Contraseña incorrecta');
      },
    });
  }
  // Verifica la contraseña ingresada
}
