import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Usuario } from '../models/usuario';
import { LoginRequest } from '../models/LoginRequest';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private apiUrl = 'http://localhost:8080/api/usuarios';

  constructor(private http: HttpClient) {}
  login(correo: string, contrasena: string): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/login`, { correo, contrasena })
      .pipe(
        tap((response) => {
          console.log('Respuesta del servidor:', response); // Aquí debe aparecer el nombre y el token correctamente
          const user = { nombre: response.nombre, token: response.token }; // Asegúrate de que 'response' contiene 'nombre' y 'token'
          localStorage.setItem('currentUser', JSON.stringify(user)); // Guarda el objeto completo en localStorage
        }),
        catchError(this.handleError)
      );
  }

  // Método para manejar errores
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ha ocurrido un error desconocido.';

    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      errorMessage = `Error ${error.status}: ${error.message}`;
    }

    return throwError(() => new Error(errorMessage));
  }

  /*login(correo: string, contrasena: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .post(`${this.apiUrl}/login`, { correo, contrasena }, { headers })
      .pipe(
        catchError((error) => {
          console.error('Error en el login', error);
          return throwError(error);
        })
      );
  }*/
  /* Método para guardar el token y la información del usuario en el localStorage
  setUsuarioInfo(nombre: string, token: string): void {
    localStorage.setItem('usuario', JSON.stringify({ nombre, token }));
  }*/

  // Método para registrar un nuevo usuario (ya lo debes tener, pero lo dejo aquí)
  registro(usuario: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' }); // Asegúrate de que los headers sean correctos
    return this.http.post(`${this.apiUrl}/registro`, usuario, { headers }).pipe(
      catchError((error) => {
        console.error('Error en el registro', error);
        return throwError(error); // Manejo de errores
      })
    );
  }

  setUsuarioInfo(nombre: string, token: string) {
    localStorage.setItem('nombreUsuario', nombre); // Almacena el nombre
    localStorage.setItem('token', token); // Almacena el token
  }

  getNombreUsuario(): string | null {
    return localStorage.getItem('nombreUsuario'); // Recupera el nombre
  }
  logout(): void {
    localStorage.clear();
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }
}
