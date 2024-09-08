import { Component } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss',
})
export class PerfilComponent {
  usuario!: Usuario;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.cargarPerfil();
  }

  cargarPerfil(): void {
    this.usuarioService.obtenerPerfil().subscribe((data: Usuario) => {
      this.usuario = data;
    });
  }

  actualizarPerfil(): void {
    this.usuarioService
      .actualizarPerfil(this.usuario)
      .subscribe((updatedUsuario) => {
        this.usuario = updatedUsuario;
        alert('Perfil actualizado con éxito');
      });
  }
}
