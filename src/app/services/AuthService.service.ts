/*import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl = 'http://localhost:8080/api/auth';
  private currentUserSubject = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {}

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http
      .post(`${this.authUrl}/login`, credentials)
      .pipe(tap((user) => this.currentUserSubject.next(user)));
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.authUrl}/register`, user);
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); // Verifica si el token existe
  }
  /* logout(): void {
    this.currentUserSubject.next(null);
   / Implementar lógica adicional si es necesario
  }
  logout() {
    localStorage.removeItem('token');
  }
  getToken(): string | null {
    return localStorage.getItem('token'); // Aquí se asume que el token se guarda en localStorage
  }
  getCurrentUser(): Observable<any> {
    return this.currentUserSubject.asObservable();
  }

  isAuthenticated(): boolean {
    return this.currentUserSubject.value != null;
  }
}
*/
