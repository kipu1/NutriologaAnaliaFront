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
  currentSlide: number = 0;
  totalSlides: number = 3;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  servicios(): void {
    this.router.navigate(['/servicios']);
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
