import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private clientId = '5123a0923bf04f4881596bc3d636fec1';
  private clientSecret = 'cba9808a3a3f4cbe8919fcf06e8b68a2';
  private redirectUri = 'http://localhost:4200/callback';
  private authEndpoint = 'https://accounts.spotify.com/authorize';
  private tokenEndpoint = 'https://accounts.spotify.com/api/token';
  private apiUrl = 'https://api.spotify.com/v1';
  private accessToken: string | null = null;

  private searchQuery = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {
    const savedToken = sessionStorage.getItem('spotifyAccessToken');
    if (savedToken) {
      this.accessToken = savedToken;
    }
    this.searchQuery.subscribe(query => this.buscarCanciones(query));
  }
  

  /**
   * Genera la URL para iniciar sesión en Spotify
   */
  getAuthUrl(currentPath: string): string {
    const scopes = 'playlist-read-private user-read-private';
    const state = encodeURIComponent(currentPath); // Ruta actual como estado
    return `${this.authEndpoint}?client_id=${this.clientId}&response_type=code&redirect_uri=${encodeURIComponent(this.redirectUri)}&scope=${scopes}&state=${state}`;
  }

  /**
   * Intercambia el código por un token de acceso
   */
  fetchAccessToken(authCode: string): Promise<void> {
    const body = new HttpParams()
      .set('grant_type', 'authorization_code')
      .set('code', authCode)
      .set('redirect_uri', this.redirectUri)
      .set('client_id', this.clientId)
      .set('client_secret', this.clientSecret);
  
    return this.http.post<{ access_token: string }>(this.tokenEndpoint, body.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).toPromise().then(response => {
      if (response?.access_token) {
        this.accessToken = response.access_token;
        sessionStorage.setItem('spotifyAccessToken', response.access_token); // Guarda el token en sessionStorage
      } else {
        console.error('No se pudo obtener un token de acceso válido:', response);
        throw new Error('Token de acceso no válido');
      }
    }).catch(error => {
      console.error('Error al intercambiar el código por un token:', error);
      throw error;
    });
  }
  

  /**
   * Devuelve el token de acceso actual
   */
  getAccessToken(): string | null {
    if (!this.accessToken) {
      this.accessToken = sessionStorage.getItem('spotifyAccessToken'); // Recupera el token si no está en memoria
    }
    return this.accessToken;
  }
  

  /**
   * Configura manualmente el token de acceso
   */
  setAccessToken(token: string): void {
    this.accessToken = token;
  }

  /**
   * Busca canciones en Spotify
   */
  async buscarCanciones(query: string): Promise<any> {
    if (!this.accessToken) {
      console.error('Token no disponible. Asegúrate de autenticarte.');
      return [];
    }
  
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.accessToken}`
    });
  
    try {
      const response: any = await this.http.get(`${this.apiUrl}/search`, {
        headers,
        params: new HttpParams()
          .set('q', query)
          .set('type', 'track')
          .set('limit', '10')
      }).toPromise();
  
      console.log('Respuesta de Spotify:', response);
  
      if (response?.tracks?.items) {
        return response.tracks.items.map((track: any) => ({
          name: track.name || 'Canción desconocida', // Valor predeterminado
          artist: track.artists?.[0]?.name || 'Artista desconocido', // Valor predeterminado
          preview_url: track.preview_url || null, // Null si no hay URL de vista previa
          spotify_url: track.external_urls?.spotify || '#' // Enlace a Spotify o un enlace vacío
        }));
      } else {
        console.warn('No se encontraron canciones.');
        return [];
      }
    } catch (error) {
      console.error('Error al buscar canciones en Spotify:', error);
      return [];
    }
  }
      

  /**
   * Actualiza la búsqueda activa
   */
  setSearchQuery(query: string): void {
    this.searchQuery.next(query);
  }
}
