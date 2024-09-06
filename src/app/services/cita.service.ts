import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Cita } from '../models/cita';
import { UsuarioService } from './usuario.service';
import { LocalStorageService } from './LocalStorageService';

@Injectable({
  providedIn: 'root',
})
export class CitaService {
  private apiUrl = 'http://localhost:8080/api/citas';

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}
  agendarCita(cita: Cita): Observable<Cita> {
    const token = localStorage.getItem('token'); // Obtener el token JWT desde el localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Establecer encabezados con el token

    return this.http.post<Cita>(`${this.apiUrl}/agendar`, cita, { headers });
  }

  /*listarCitas(): Observable<Cita[]> {
    const token = localStorage.getItem('token'); // Obtener el token del localStorage
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<Cita[]>(`${this.apiUrl}/listar`, { headers });
  }*/
  listarCitas(): Observable<Cita[]> {
    const token = localStorage.getItem('token'); // Obtener el token del localStorage

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<Cita[]>(`${this.apiUrl}/listar`, { headers }).pipe(
      map((citas: any[]) => {
        // Asegurarte de que `fechaHora` sea un objeto `Date`
        return citas.map((cita) => ({
          ...cita,
          fechaHora: new Date(cita.fechaHora), // Convierte fechaHora a Date
        }));
      })
    );
  }
  eliminarCita(id: number | undefined): Observable<void> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<void>(`${this.apiUrl}/eliminar/${id}`, { headers });
  }

  // Actualizar cita
  actualizarCita(id: number, cita: Cita): Observable<Cita> {
    const token = localStorage.getItem('token'); // Obtener el token del localStorage
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.put<Cita>(`${this.apiUrl}/actualizar/${id}`, cita, {
      headers,
    });
  }
  obtenerCita(id: number): Observable<Cita> {
    const token = localStorage.getItem('token'); // Obtiene el token JWT del localStorage

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Agrega el token en los encabezados

    return this.http.get<Cita>(`${this.apiUrl}/obtener/${id}`, { headers }); // Incluye los encabezados en la solicitud
  }
}
