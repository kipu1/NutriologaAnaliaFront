import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Curso } from '../models/curso';

@Injectable({
  providedIn: 'root',
})
export class CursoService {
  private baseUrl = 'http://localhost:8080/api/cursos';

  constructor(private http: HttpClient) {}

  getCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(`${this.baseUrl}/all`);
  }

  uploadCurso(curso: Curso): Observable<Curso> {
    return this.http.post<Curso>(`${this.baseUrl}/upload`, curso);
  }
}
