import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { Cita } from '../models/cita';
import { UsuarioService } from './usuario.service';
import { LocalStorageService } from './LocalStorageService';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class CitaService {
  //private apiUrl = 'http://localhost:8080/api/citas';
  private apiUrl = `${environment.apiUrl}/citas`;
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}
  agendarCita(cita: Cita): Observable<any> {
    return this.http.post(`${this.apiUrl}/agendar`, cita); // Enviar POST a /api/citas/agendar
  }
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
  verificarHorasOcupadas(fecha: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/horas-ocupadas`, {
      params: { fecha },
    });
  }

  verificarDisponibilidad(fechaHora: string): Observable<boolean> {
    return this.http
      .get<any>(`${this.apiUrl}/verificar-disponibilidad`, {
        params: { fechaHora },
      })
      .pipe(
        map((response) => response.disponible),
        catchError(() => of(false)) // Si ocurre un error, devuelve "false" como no disponible
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
  obtenerCitasPorCedula(cedula: string): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(`${this.apiUrl}/historia/${cedula}`, {
      headers,
    });
  }
}
