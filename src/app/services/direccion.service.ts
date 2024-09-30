import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class DireccionService {
  // Cambia la URL según tu backendprivate apiUrl = 'http://localhost:8080/api/direcciones';
  private apiUrl = `${environment.apiUrl}/direcciones`;

  constructor(private http: HttpClient) {}

  // Método para guardar una nueva dirección
  guardarDireccion(direccion: { direccion: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/guardar`, direccion);
  }
}
