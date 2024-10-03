import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LocalStorageService } from '../../services/LocalStorageService';
import { ToastrService } from 'ngx-toastr';

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

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private toastr: ToastrService // Inyecta ToastrService
  ) {}

  login(correo: string, contrasena: string): void {
    // Verificar si faltan los campos
    if (!correo || !contrasena) {
      this.toastr.error(
        'Por favor, ingresa el correo y la contraseña',
        'Error'
      );
      return;
    }

    this.usuarioService.login(correo, contrasena).subscribe(
      (response) => {
        if (response && response.token) {
          // Guardar el token en el localStorage a través del servicio
          this.localStorageService.setItem('token', response.token);

          // Guardar la información del usuario en tu usuarioService
          this.usuarioService.setUsuarioInfo(response.nombre, response.token);

          // Mostrar una notificación de éxito
          this.toastr.success('Inicio de sesión exitoso', 'Éxito');

          // Redirigir al home después del login exitoso y recargar la página discretamente
          this.router.navigate(['/home']).then(() => {
            window.location.reload(); // Recarga la página después de redirigir
          });
        } else {
          // Si la respuesta no contiene el token, mostrar error
          this.toastr.error(
            'Error en la respuesta del servidor: falta el token',
            'Error del servidor'
          );
        }
      },
      (error) => {
        // Si hay un error en el login, mostrar alerta de error
        this.toastr.error('Correo o contraseña incorrectos', 'Error');
        console.error('Error en el login', error);
      }
    );
  }

  /* login(correo: string, contrasena: string): void {
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
  }*/
}
