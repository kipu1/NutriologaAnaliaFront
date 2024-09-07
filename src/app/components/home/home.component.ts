import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule], // Importa los componentes standalone aquí
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  nombreUsuario: string | null = '';

  constructor(private router: Router) {}
  ngOnInit(): void {}

  /* ngOnInit() {
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
  }*/
  servicios(): void {
    this.router.navigate(['/servicios']);
  }
  conoceme(): void {
    this.router.navigate(['/conoceme']);
  }
}
