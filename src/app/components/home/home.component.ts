import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DireccionService } from '../../services/direccion.service';
import { FormsModule } from '@angular/forms';
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
  mapaUrl: string =
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3780.9170632923525!2d-103.35551598455352!3d20.675157102141455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8428b08f7db0c12d%3A0x7ed776d60c979e8d!2sCentro%2C%2044600%20Guadalajara%2C%20Jal.%2C%20México!5e0!3m2!1ses!2sec!4v1693945987841!5m2!1ses!2sec';
  nuevaDireccion: string = '';
  constructor(
    public sanitizer: DomSanitizer,
    private direccionService: DireccionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.guardarDireccion();
  }

  servicios(): void {
    this.router.navigate(['/lista-servicio']);
  }
  guardarDireccion() {
    const direccionCodificada = encodeURIComponent(this.nuevaDireccion);
    this.mapaUrl = `https://www.google.com/maps/embed/v1/place?AIzaSyBqJM0nWssDSQgtBg2vz14zxva5JPjrtEg&q=${direccionCodificada}`;
  }
  conoceme(): void {
    this.router.navigate(['/conoceme']);
  }

  // Función para ir al slide anterior
  prevSlide() {
    this.pauseCurrentVideo(); // Pausar el video actual antes de cambiar de slide
    this.currentSlide =
      this.currentSlide === 0 ? this.totalSlides - 1 : this.currentSlide - 1;
    this.updateSlidePosition();
  }

  // Función para ir al siguiente slide
  nextSlide() {
    this.pauseCurrentVideo(); // Pausar el video actual antes de cambiar de slide
    this.currentSlide =
      this.currentSlide === this.totalSlides - 1 ? 0 : this.currentSlide + 1;
    this.updateSlidePosition();
  }

  // Actualizar la posición del carrusel
  updateSlidePosition() {
    const carousel = document.querySelector('.carousel') as HTMLElement;
    carousel.style.transform = `translateX(-${this.currentSlide * 100}%)`;
  }

  // Pausar el video actual cuando cambias de slide
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
