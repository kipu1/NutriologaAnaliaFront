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
  nombreUsuario: string | null = '';
  // Cambia según el estado de autenticación real
  isDropdownOpen = false; // Estado del menú desplegable

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.checkLoginStatus(); // Verifica el estado de autenticación al cargar el componente
    const currentUser = localStorage.getItem('currentUser');
    console.log('Usuario logueado:', currentUser); // Verifica en la consola si el currentUser tiene nombre y token

    if (currentUser) {
      const user = JSON.parse(currentUser);
      if (user.nombre) {
        this.nombreUsuario = user.nombre; // Asigna el nombre correctamente
      } else {
        this.nombreUsuario = 'Nombre no encontrado'; // Mensaje por si no encuentra el nombre
      }
    } else {
      this.nombreUsuario = 'No hay usuario logueado';
    }
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
    this.router.navigate(['/loginana']).then(() => {
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
    this.router.navigate(['/crear-curso']);
  }

  goToListaCursos(): void {
    this.router.navigate(['/lista-cursos']);
  }

  servicios(): void {
    this.router.navigate(['/servicios']);
  }
  home(): void {
    this.router.navigate(['/home']);
  }
  historia(): void {
    this.router.navigate(['/historia-clinica']);
  }
  perfil(): void {
    this.router.navigate(['/perfil']);
  }
  Listaservicios(): void {
    this.router.navigate(['/lista-servicio']);
  }
  conoceme(): void {
    this.router.navigate(['/conoceme']);
  }
  Cursover(): void {
    this.router.navigate(['/ver-lista-curso']);
  }
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  closeDropdown() {
    this.isDropdownOpen = false; // Cierra el menú desplegable
  }

  serviciosver(): void {
    this.router.navigate(['/ver-lista-servicio']);
  }
  direccion(): void {
    this.router.navigate(['/crear-direccion']);
  }
}
