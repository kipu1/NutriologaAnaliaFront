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

  contrasena: string = '';
  errorMessage: string = '';

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  registro() {
    // Verificar que todos los campos están completos
    if (!this.nombre || !this.correo || !this.telefono || !this.contrasena) {
      this.errorMessage = 'Por favor, completa todos los campos';
      return;
    }

    const usuario = {
      nombre: this.nombre,
      correo: this.correo,
      telefono: this.telefono, // Ahora está correcto
      // Ahora está correcto
      contrasena: this.contrasena,
    };
    this.usuarioService.registro(usuario).subscribe(
      (response) => {
        // Redirigir al login si el registro es exitoso
        this.router.navigate(['/login']);
      },
      (error) => {
        if (error.status === 403) {
          this.errorMessage = 'No tienes permiso para realizar esta acción';
        } else if (error.status === 500) {
          this.errorMessage =
            'Error en el servidor. Intenta de nuevo más tarde.';
        } else {
          this.errorMessage =
            'Ocurrió un error inesperado. Inténtalo de nuevo.';
        }
        console.error('Error en el registro', error);
      }
    );
  }
}
