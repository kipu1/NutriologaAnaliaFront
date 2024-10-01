import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';
import { Direccion } from '../models/direccion';

@Injectable({
  providedIn: 'root',
})
export class DireccionService {
  private apiUrl = `${environment.apiUrl}/direcciones`; // URL de la API

  constructor(private http: HttpClient) {}

  // Método para crear una dirección

  crearDireccion(direccion: Direccion): Observable<Direccion> {
    const token = localStorage.getItem('token'); // Obtener el token JWT desde el localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Establecer encabezados con el token

    return this.http.post<Direccion>(`${this.apiUrl}/crear`, direccion, {
      headers,
    });
  }

  listarDirecciones(): Observable<Direccion[]> {
    return this.http.get<Direccion[]>(`${this.apiUrl}/listar`);
  }

  eliminarDireccion(id: number): Observable<void> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.delete<void>(`${this.apiUrl}/eliminar/${id}`, { headers });
  }
  actualizarServicio(id: number, servicio: Direccion): Observable<Direccion> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put<Direccion>(
      `${this.apiUrl}/actualizar/${id}`,
      servicio,
      { headers }
    );
  }
}
