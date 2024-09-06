import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  standalone: true, // Declarado como standalone
  selector: 'app-header',
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isLoggedIn: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.checkLoginStatus(); // Verifica el estado de autenticación al cargar el componente
  }

  checkLoginStatus(): void {
    const user = localStorage.getItem('currentUser'); // Verifica si hay un usuario en localStorage
    this.isLoggedIn = !!user; // Si existe, entonces está logueado
  }

  logout(): void {
    localStorage.removeItem('currentUser'); // Remueve al usuario del almacenamiento local
    this.isLoggedIn = false; // Actualiza el estado de autenticación
    this.router.navigate(['/home']).then(() => {
      window.location.reload(); // Recarga la página después de redirigir
    });
  }

  goToLogin(): void {
    this.router.navigate(['/login']).then(() => {
      window.location.reload(); // Recarga la página después de redirigir
    });
  }
  goToAgendarCita(): void {
    this.router.navigate(['/agendar-cita']);
  }

  goToListaCitas(): void {
    this.router.navigate(['/lista-citas']);
  }

  goToAgregarCurso(): void {
    this.router.navigate(['/agregar-curso']);
  }

  goToListaCursos(): void {
    this.router.navigate(['/lista-cursos']);
  }

  servicios(): void {
    this.router.navigate(['/servicios']);
  }
}
