import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  correo: string = ''; // Campo para el correo
  contrasena: string = ''; // Campo para la contraseña
  errorMessage: string = ''; // Propiedad para almacenar el mensaje de error

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  login(correo: string, contrasena: string): void {
    if (!correo || !contrasena) {
      this.errorMessage = 'Por favor, ingresa el correo y la contraseña';
      return;
    }
    this.usuarioService.login(this.correo, this.contrasena).subscribe(
      (response) => {
        // Asegúrate de que response contiene tanto nombre como token
        this.usuarioService.setUsuarioInfo(response.nombre, response.token); // Pasa ambos valores
        this.router.navigate(['/home']); // Redirigir a Home
      },
      (error) => {
        this.errorMessage = 'Correo o contraseña incorrectos';
        console.error('Error en el login', error);
      }
    );
  }

  irARegistro() {
    this.router.navigate(['/registro']); // Redirige a la página de registro
  }
}
