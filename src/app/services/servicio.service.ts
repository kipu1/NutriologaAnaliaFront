import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Servicio } from '../models/servicio';
@Injectable({
  providedIn: 'root',
})
export class ServicioService {
  private apiUrl = 'http://localhost:8080/api/servicios'; // URL de la API

  constructor(private http: HttpClient) {}

  // Método para crear un servicio
  crearServicio(servicio: Servicio): Observable<Servicio> {
    const token = localStorage.getItem('token'); // Obtener el token JWT desde el localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Establecer encabezados con el token

    return this.http.post<Servicio>(`${this.apiUrl}/crear`, servicio, {
      headers,
    });
  }

  // Método para actualizar un servicio
  actualizarServicio(id: number, servicio: Servicio): Observable<Servicio> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put<Servicio>(
      `${this.apiUrl}/actualizar/${id}`,
      servicio,
      { headers }
    );
  }

  // Método para eliminar un servicio
  eliminarServicio(id: number): Observable<void> {
    const token = localStorage.getItem('token'); // Obtener el token JWT desde el localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Establecer encabezados con el token

    return this.http.delete<void>(`${this.apiUrl}/eliminar/${id}`, { headers });
  }

  // Método para listar servicios
  listarServicios(): Observable<Servicio[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Servicio[]>(`${this.apiUrl}/listar`, { headers });
  }

  // Método para eliminar un servicio
}
