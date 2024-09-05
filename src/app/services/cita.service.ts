import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cita } from '../models/cita';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root',
})
export class CitaService {
  private baseUrl = 'http://localhost:8080/api/citas';

  constructor(
    private http: HttpClient,
    private usuarioService: UsuarioService
  ) {}

  /*agendarCita(cita: Cita): Observable<Cita> {
    return this.http.post<Cita>(`${this.baseUrl}/agendar`, cita);
  }*/

  getCitas(): Observable<Cita[]> {
    return this.http.get<Cita[]>(`${this.baseUrl}/all`);
  }
  agendarCita(cita: Cita): Observable<Cita> {
    const headers = this.usuarioService.getAuthHeaders(); // Ahora puedes usar usuarioService para obtener los headers
    return this.http.post<Cita>(`${this.baseUrl}/agendar`, cita, { headers });
  }
}
