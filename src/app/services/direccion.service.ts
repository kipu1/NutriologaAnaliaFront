import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DireccionService {
  private apiUrl = 'http://localhost:8080/api/direcciones'; // Cambia la URL según tu backend

  constructor(private http: HttpClient) {}

  // Método para guardar una nueva dirección
  guardarDireccion(direccion: { direccion: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/guardar`, direccion);
  }
}
