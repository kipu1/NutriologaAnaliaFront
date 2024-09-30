import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';
import { Direccion } from '../models/direccion';

@Injectable({
  providedIn: 'root',
})
export class DireccionService {
  private apiUrl = `${environment.apiUrl}/direcciones`; // API de direcciones

  constructor(private http: HttpClient) {}

  // Obtener todas las direcciones
  obtenerDirecciones(): Observable<Direccion[]> {
    return this.http.get<Direccion[]>(`${this.apiUrl}`);
  }

  // Crear una nueva dirección
  crearDireccion(direccion: Direccion): Observable<Direccion> {
    return this.http.post<Direccion>(`${this.apiUrl}/crear`, direccion);
  }

  // Eliminar una dirección por ID
  eliminarDireccion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/eliminar/${id}`);
  }
}
