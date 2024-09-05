import { HttpClient } from '@angular/common/http';
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

  logout(): void {
    this.currentUserSubject.next(null);
    // Implementar lógica adicional si es necesario
  }

  getCurrentUser(): Observable<any> {
    return this.currentUserSubject.asObservable();
  }

  isAuthenticated(): boolean {
    return this.currentUserSubject.value != null;
  }
}
