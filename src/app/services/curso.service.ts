import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Curso } from '../models/curso';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class CursoService {
  //private baseUrl = 'http://localhost:8080/api/cursos';
  private baseUrl = `${environment.apiUrl}/cursos`;
  constructor(private http: HttpClient) {}

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
    const params = { password };
    return this.http
      .get(`${this.baseUrl}/descargar/${id}`, {
        params: params, // Parámetro de contraseña
        responseType: 'blob', // Asegúrate de que la respuesta es un archivo binario
      })
      .pipe(
        catchError((error) => {
          console.error('Error al descargar el archivo', error);
          return throwError(error);
        })
      );
  }

  actualizarCurso(id: number, curso: FormData): Observable<Curso> {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return throwError('No token found');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<Curso>(`${this.baseUrl}/actualizar/${id}`, curso, {
      headers,
    });
  }

  // Método para eliminar un curso
  eliminarCurso(id: number): Observable<void> {
    const token = localStorage.getItem('token'); // Obtener el token JWT desde el localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Establecer encabezados con el token

    return this.http.delete<void>(`${this.baseUrl}/eliminar/${id}`, {
      headers,
    });
  }
}
