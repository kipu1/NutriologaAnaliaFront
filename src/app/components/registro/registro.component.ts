import { Component } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss',
})
export class RegistroComponent {
  nombre: string = '';
  correo: string = '';
  telefono: string = '';
  direccion: string = '';
  contrasena: string = '';

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private toastr: ToastrService // Inyecta ToastrService
  ) {}

  registro() {
    // Verifica que todos los campos están completos
    if (
      !this.nombre ||
      !this.correo ||
      !this.telefono ||
      !this.direccion ||
      !this.contrasena
    ) {
      // Usa Toastr para mostrar la alerta en vez de un mensaje en HTML
      this.toastr.error('Por favor, completa todos los campos.', 'Error');
      return;
    }

    const usuario = {
      nombre: this.nombre,
      correo: this.correo,
      telefono: this.telefono,
      contrasena: this.contrasena,
      direccion: this.direccion,
    };

    this.usuarioService.registro(usuario).subscribe(
      (response) => {
        this.toastr.success('Registro exitoso', 'Éxito');
        this.router.navigate(['/loginana']);
      },
      (error) => {
        if (error.status === 403) {
          this.toastr.error(
            'No tienes permiso para realizar esta acción',
            'Error'
          );
        } else if (error.status === 500) {
          this.toastr.error(
            'Error en el servidor. Intenta de nuevo más tarde.',
            'Error del servidor'
          );
        } else {
          this.toastr.error(
            'Ocurrió un error inesperado. Inténtalo de nuevo.',
            'Error'
          );
        }
        console.error('Error en el registro', error);
      }
    );
  }
  irALogin() {
    this.router.navigate(['/loginana']); // Redirige al usuario al componente de login
  }
}
