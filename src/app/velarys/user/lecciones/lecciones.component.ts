import { Component, OnInit, Renderer2, Inject, PLATFORM_ID } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LeccionService } from './../../services/leccion.service';
import { Leccion } from './../../models/leccion.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { YoutubeService } from '../../services/youtube.service';
import { SpotifyService } from '../../services/spotify.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-lecciones',
  templateUrl: './lecciones.component.html',
  styleUrls: ['./lecciones.component.css']
})
export class LeccionesComponent implements OnInit {
  lecciones: Leccion[] = [];
  nivelId: number = 0;
  cursoId: number | null = null;
  indiceActual: number = 0;
  videos: any[] = [];  // Ahora almacenamos la lista de videos
  canciones: any[] = []; // Almacena las canciones de Spotify


  constructor(
    private leccionService: LeccionService,
    private router: Router,
    private sanitizer: DomSanitizer,  // Para asegurar URLs seguras en el iframe
    private youtubeService: YoutubeService,  // Inyectar el servicio de YouTube
    private spotifyService: SpotifyService,
    private route: ActivatedRoute,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.cursoId = +this.route.snapshot.paramMap.get('cursoId')!;
    this.nivelId = +this.route.snapshot.paramMap.get('nivelId')!;
    this.obtenerLecciones();

    // Solo ejecuta el script si estamos en un entorno de navegador
    if (isPlatformBrowser(this.platformId)) {
      const script = this.renderer.createElement('script');
      script.src = 'https://cse.google.com/cse.js?cx=208825525e2834300';
      script.async = true;
      this.renderer.appendChild(document.body, script);
    }
  }

  obtenerLecciones(): void {
    if (this.nivelId !== null) {
      this.leccionService.obtenerLeccionesPorNivelId(this.nivelId).subscribe(
        response => {
          this.lecciones = response;
          // Asegúrate de que hay lecciones disponibles
          if (this.lecciones.length === 0) {
            console.warn('No se encontraron lecciones para este nivel.');
          }
        },
        error => console.error('Error al obtener las lecciones.', error)
      );
    }
  }

  anteriorLeccion(): void {
    if (this.indiceActual > 0) {
      this.indiceActual--;
      this.mostrarAyuda();
    }
  }

  siguienteLeccion(): void {
    if (this.indiceActual < this.lecciones.length - 1) {
      this.indiceActual++;
      this.mostrarAyuda();
    }
  }

  verJuegos(leccionId: number | undefined): void {
    if (leccionId !== undefined && this.cursoId) {
      this.router.navigate([`/juegos/${this.cursoId}/${this.nivelId}/${leccionId}`]);
    } else {
      console.error('Curso o lección no identificado. No se puede navegar a los juegos.');
    }
  }

  volver(): void {
    window.history.back();
  }

  mostrarAyuda(): void {
    const leccionActual = this.lecciones[this.indiceActual];
    if (leccionActual && leccionActual.nombre) {
      // Usar el título de la lección como consulta de búsqueda
      this.youtubeService.searchVideos(leccionActual.nombre).then(videos => {
        this.videos = videos;  // Almacenar todos los videos obtenidos
      }).catch(error => {
        console.error('Error al buscar videos en YouTube', error);
      });
    }
  }
  
  apoyoAuditivo(): void {
    const leccionActual = this.lecciones[this.indiceActual];
    if (leccionActual && leccionActual.nombre) {
      const token = this.spotifyService.getAccessToken();
  
      if (!token) {
        console.warn('Token no disponible. Redirigiendo al inicio de sesión de Spotify...');
        window.location.href = this.spotifyService.getAuthUrl(this.router.url);
      } else {
        this.spotifyService.buscarCanciones(leccionActual.nombre).then(tracks => {
          console.log('Canciones obtenidas:', tracks);
          this.canciones = tracks; // Almacenar las canciones en `canciones`
        }).catch(error => {
          console.error('Error al buscar canciones en Spotify', error);
        });
      }
    }
  }
    

  // Método para obtener una URL segura para el iframe
  getSafeUrl(videoId: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoId}`);
  }
}
