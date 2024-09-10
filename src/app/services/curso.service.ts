import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Curso } from '../models/curso';
import { AuthService } from './AuthService.service';

@Injectable({
  providedIn: 'root',
})
export class CursoService {
  private baseUrl = 'http://localhost:8080/api/cursos';

  constructor(private http: HttpClient, private authService: AuthService) {}

  crearCurso(curso: FormData): Observable<Curso> {
    const token = localStorage.getItem('token'); // Obtener el token JWT desde el localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Establecer encabezados con el token

    return this.http.post<Curso>(`${this.baseUrl}/crear`, curso, { headers });
  }
  listarCursos(): Observable<Curso[]> {
    const token = localStorage.getItem('token'); // Asegúrate de que el token esté bien almacenado
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Curso[]>(`${this.baseUrl}/listar`, { headers });
  }
  descargarCurso(id: number, password: string): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/descargar/${id}`, {
      params: { password },
      responseType: 'blob', // Esto es importante para descargar archivos binarios
    });
  }
}
