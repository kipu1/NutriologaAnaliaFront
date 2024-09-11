import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root',
})
export class InactivityService {
  private userInactive: any;
  private warningTimeout: any;
  private logoutTimer: number = 3600000; // 1 hora en milisegundos (1 hora = 60 * 60 * 1000)
  private warningTime: number = 300000; // Mostrar advertencia 5 minutos antes del cierre (300,000 ms = 5 minutos)

  constructor(private router: Router, private usuarioService: UsuarioService) {
    this.setTimeout();
    this.listenToUser();
  }

  // Configura un temporizador que cerrará la sesión del usuario después de 1 hora de inactividad
  setTimeout() {
    // Configura un temporizador para mostrar una advertencia antes del cierre
    this.warningTimeout = setTimeout(() => {
      alert(
        'Tu sesión está a punto de expirar. Por favor, interactúa para evitar el cierre de sesión.'
      ); // Mostrar advertencia
    }, this.logoutTimer - this.warningTime); // Advertencia 5 minutos antes

    // Temporizador de cierre de sesión
    this.userInactive = setTimeout(() => {
      this.usuarioService.logout(); // Ejecuta el método de logout en el servicio
      this.router.navigate(['/home']); // Redirige al login
    }, this.logoutTimer);
  }

  // Reinicia el temporizador cada vez que detecte actividad
  resetTimeout() {
    clearTimeout(this.userInactive);
    clearTimeout(this.warningTimeout); // Limpiar también el temporizador de advertencia
    this.setTimeout(); // Vuelve a iniciar el temporizador
  }

  // Escucha los eventos de actividad del usuario
  listenToUser() {
    window.addEventListener('mousemove', () => this.resetTimeout());
    window.addEventListener('keydown', () => this.resetTimeout());
    window.addEventListener('click', () => this.resetTimeout());
  }
}
