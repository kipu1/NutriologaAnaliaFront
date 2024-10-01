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
import { Direccion } from '../../models/direccion';
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
  mapaUrl!: SafeResourceUrl;
  nuevaDireccion: string = '';
  usuario!: Usuario;
  direccionUrl: string = '';
  constructor(
    public sanitizer: DomSanitizer,
    private router: Router,
    private usuarioservice: UsuarioService,
    private direccionService: DireccionService
  ) {}

  ngOnInit(): void {
    this.cargarPerfil();
    this.cargarDireccion();
  }

  cargarDireccion(): void {
    this.direccionService.listarDirecciones().subscribe({
      next: (direcciones) => {
        if (direcciones.length > 0) {
          const direccion = direcciones[0]; // Tomamos la primera dirección
          this.direccionUrl = this.generarUrlGoogleMaps(direccion.direccion);
        }
      },
    });
  }
  generarUrlGoogleMaps(direccion: string): string {
    const baseUrl = 'https://www.google.com/maps/search/?api=1&query=';
    return `${baseUrl}${encodeURIComponent(direccion)}`; // Asegúrate de codificar correctamente la dirección
  }

  cargarPerfil(): void {
    this.usuarioservice.obtenerPerfil().subscribe((data: Usuario) => {
      this.usuario = data;
    });
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
