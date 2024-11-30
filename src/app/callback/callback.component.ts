import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpotifyService } from '../velarys/services/spotify.service';

@Component({
  selector: 'app-callback',
  template: '<p>Procesando autenticación...</p>'
})
export class CallbackComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private spotifyService: SpotifyService
  ) {}

  ngOnInit(): void {
    // Obtener el código y el estado de la URL
    const code = this.route.snapshot.queryParamMap.get('code');
    const state = this.route.snapshot.queryParamMap.get('state'); // Ruta original

    if (code) {
      this.spotifyService.fetchAccessToken(code).then(() => {
        console.log('Token de acceso obtenido:', this.spotifyService.getAccessToken());
        const redirectTo = state ? decodeURIComponent(state) : '/';
        this.router.navigate([redirectTo]); // Redirigir a la ruta original
      }).catch(err => {
        console.error('Error al autenticar con Spotify:', err);
        this.router.navigate(['/']); // Redirigir al inicio en caso de error
      });
    } else {
      console.error('No se recibió ningún código de autenticación.');
      this.router.navigate(['/']);
    }
  }
}
