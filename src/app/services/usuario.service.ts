import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Usuario } from '../models/usuario';
import { LoginRequest } from '../models/LoginRequest';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  //private apiUrl = 'http://localhost:8080/api/usuarios';
  private apiUrl = `${environment.apiUrl}/usuarios`;

  constructor(private http: HttpClient) {}
  registro(usuario: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .post(`${this.apiUrl}/registro`, usuario, {
        headers,
        withCredentials: true,
      })
      .pipe(
        catchError((error) => {
          console.error('Error en el registro', error);
          return throwError(error);
        })
      );
  }

  login(correo: string, contrasena: string): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/login`, { correo, contrasena })
      .pipe(
        tap((response) => {
          console.log('Respuesta del servidor:', response);
          const user = {
            nombre: response.nombre,
            correo: response.correo,
            token: response.token,
          };
          localStorage.setItem('currentUser', JSON.stringify(user));
        }),
        catchError(this.handleError)
      );
  }

  obtenerPerfil(): Observable<Usuario> {
    const headers = this.getAuthHeaders();
    return this.http.get<Usuario>(`${this.apiUrl}/perfil`, { headers }).pipe(
      tap((usuario) => {
        console.log('Datos del perfil del usuario:', usuario);
      }),
      catchError(this.handleError)
    );
  }
  obtenerDireccion(correo: string): Observable<{ direccion: string }> {
    return this.http.get<{ direccion: string }>(
      `${this.apiUrl}/direccion/${correo}`
    );
  }

  // Actualizar el perfil del usuario
  actualizarPerfil(usuario: Usuario): Observable<Usuario> {
    const headers = this.getAuthHeaders(); // Obtener headers con el token
    return this.http
      .put<Usuario>(`${this.apiUrl}/perfil/actualizar`, usuario, { headers })
      .pipe(
        tap((updatedUsuario) => {
          console.log('Perfil actualizado:', updatedUsuario);
        }),
        catchError(this.handleError)
      );
  }

  // Método para manejar errores
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ha ocurrido un error desconocido.';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error ${error.status}: ${error.message}`;
    }

    return throwError(() => new Error(errorMessage));
  }

  /*Registro de un nuevo usuario
  registro(usuario: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/registro`, usuario, { headers }).pipe(
      catchError((error) => {
        console.error('Error en el registro', error);
        return throwError(error);
      })
    );
  }*/

  // Guardar los datos del usuario en localStorage
  setUsuarioInfo(usuario: Usuario, token: string) {
    const user = {
      nombre: usuario.nombre,
      correo: usuario.correo,
      telefono: usuario.telefono,

      token: token,
    };
    localStorage.setItem('currentUser', JSON.stringify(user)); // Guardar toda la información del usuario en localStorage
  }
  //obtenerDireccion(): Observable<{ direccion: string }> {
  // return this.http.get<{ direccion: string }>(this.apiUrl);
  //}
  // Obtener nombre del usuario desde localStorage
  getNombreUsuario(): string | null {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return currentUser.nombre || null;
  }

  // Obtener correo del usuario desde localStorage
  getCorreoUsuario(): string | null {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return currentUser.correo || null;
  }

  // Obtener teléfono del usuario desde localStorage
  getTelefonoUsuario(): string | null {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return currentUser.telefono || null;
  }

  // Obtener dirección del usuario desde localStorage
  getDireccionUsuario(): string | null {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return currentUser.direccion || null;
  }

  // Limpiar localStorage al cerrar sesión
  logout(): void {
    localStorage.clear(); // Limpiar toda la información del localStorage
    // Redireccionar al usuario a la página de login o home
    window.location.href = '/home'; // Cambia esta ruta a la página que prefieras
  }

  // Obtener token del localStorage
  getToken(): string | null {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return currentUser.token || null;
  }

  // Obtener headers con el token de autenticación
  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }
}
