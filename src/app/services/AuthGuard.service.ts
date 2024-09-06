import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './AuthService.service';
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
}
