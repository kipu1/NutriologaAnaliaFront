import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DireccionService } from '../../services/direccion.service';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../models/usuario';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule, FormsModule], // Importa los componentes standalone aquí
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  currentSlide: number = 0;
  totalSlides: number = 3;
  direccion!: string;

  constructor(
    public sanitizer: DomSanitizer,
    private router: Router,
    private usuarioservice: UsuarioService
  ) {}

  ngOnInit(): void {
    this.obtenerDireccion();
  }

  obtenerDireccion(): void {
    const correo = 'correo@ejemplo.com'; // Aquí usa el correo del usuario para obtener su dirección
    this.usuarioservice.obtenerDireccion(correo).subscribe(
      (data) => {
        this.direccion = data.direccion;
      },
      (error) => {
        console.error('Error al obtener la dirección:', error);
      }
    );
  }
  servicios(): void {
    this.router.navigate(['/lista-servicio']);
  }

  conoceme(): void {
    this.router.navigate(['/conoceme']);
  }

  prevSlide() {
    this.pauseCurrentVideo();
    this.currentSlide =
      this.currentSlide === 0 ? this.totalSlides - 1 : this.currentSlide - 1;
    this.updateSlidePosition();
  }

  nextSlide() {
    this.pauseCurrentVideo();
    this.currentSlide =
      this.currentSlide === this.totalSlides - 1 ? 0 : this.currentSlide + 1;
    this.updateSlidePosition();
  }

  updateSlidePosition() {
    const carousel = document.querySelector('.carousel') as HTMLElement;
    carousel.style.transform = `translateX(-${this.currentSlide * 100}%)`;
  }

  pauseCurrentVideo() {
    const currentVideo = document.querySelectorAll('.carousel-video')[
      this.currentSlide
    ] as HTMLVideoElement;
    if (currentVideo && !currentVideo.paused) {
      currentVideo.pause();
    }
  }
}
//nombreUsuario: string | null = '';
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
