import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private usuarioService: UsuarioService, private router: Router) {}

  canActivate(): boolean {
    if (this.usuarioService.getToken()) {
      return true; // Si el token existe, permite el acceso a la ruta
    } else {
      this.router.navigate(['/home']); // Si no hay token, redirige al home no autenticado
      return false; // Bloquea el acceso a la ruta
    }
  }
  getTokenExpiration(token: string): number | null {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload ? payload.exp * 1000 : null;
  }

  isTokenExpired(): boolean {
    const token = this.usuarioService.getToken(); // Obtén el token del localStorage
    if (!token) return true;

    const expirationDate = this.getTokenExpiration(token);
    if (expirationDate) {
      return expirationDate < Date.now(); // Retorna true si el token ha expirado
    }

    return false;
  }
}
