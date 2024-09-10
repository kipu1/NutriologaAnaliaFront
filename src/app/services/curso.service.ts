import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Curso } from '../models/curso';

@Injectable({
  providedIn: 'root',
})
export class CursoService {
  private apiUrl = 'http://localhost:8080/api/cursos';

  constructor(private http: HttpClient) {}
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token no encontrado');
    }
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
  subirArchivo(selectedFile: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', selectedFile);

    return this.http.post(`${this.apiUrl}/subir-archivo`, formData, {
      headers: this.getHeaders(),
    });
  }

  verificarPassword(id: number, password: string): Observable<any> {
    const token = localStorage.getItem('token'); // Obtener el token JWT desde el localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/ver-pdf/${id}?password=${password}`, {
      headers,
    });
  }

  crearCurso(curso: Curso): Observable<Curso> {
    const token = localStorage.getItem('token'); // Obtener el token JWT desde el localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Curso>(`${this.apiUrl}/crear`, curso, { headers });
  }
  getCursos(): Observable<Curso[]> {
    const token = localStorage.getItem('token'); // Obtener el token JWT desde el localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Curso[]>(`${this.apiUrl}/listar`, { headers });
  }

  // Actualizar curso
  actualizarCurso(id: number, curso: Curso): Observable<Curso> {
    const token = localStorage.getItem('token'); // Obtener el token JWT desde el localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<Curso>(`${this.apiUrl}/actualizar/${id}`, curso, {
      headers,
    });
  }

  // Eliminar curso
  eliminarCurso(id: number): Observable<void> {
    const token = localStorage.getItem('token'); // Obtener el token JWT desde el localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<void>(`${this.apiUrl}/eliminar/${id}`, { headers });
  }
}
