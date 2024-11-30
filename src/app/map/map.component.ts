import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import mapboxgl from 'mapbox-gl';
import { environment } from '../velarys/services/environment';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  map!: mapboxgl.Map;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      mapboxgl.accessToken = environment.mapbox.accessToken;

      this.map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-39.8271, 35.4915], // Centro inicial
        zoom: 2 
      });

      this.map.addControl(new mapboxgl.NavigationControl());

      // Evento para mostrar mensaje al hacer clic en el mapa
      this.map.on('click', (e) => {
        const coordinates = e.lngLat;
        this.showWelcomeMessage(coordinates); 
      });
    }
  }

  showWelcomeMessage(coordinates: mapboxgl.LngLat) {
    const message = this.getLocationMessage(coordinates);
    window.alert(message);
  }
  getLocationMessage(coordinates: mapboxgl.LngLat): string {
    const lng = coordinates.lng;
    const lat = coordinates.lat;
  
    if (lng >= -125.0 && lng <= -66.9 && lat >= 24.5 && lat <= 49.3) { // Estados Unidos
      return '¡Bienvenido a Estados Unidos!\n\n' +
             'Aquí se habla principalmente inglés.\n' +
             'Otros países donde se habla inglés: Reino Unido, Canadá, Australia.\n' +
             '¡Explora la rica diversidad cultural y geográfica de este país! 🌎';
    } else if (lng >= -5.0 && lng <= 10.5 && lat >= 41.0 && lat <= 51.1) { // Francia
      return '¡Bienvenido a Francia!\n\n' +
             'En Francia, el idioma oficial es el francés.\n' +
             'Otros países donde se habla francés: Bélgica, Suiza, Canadá.\n' +
             'Disfruta de la exquisita gastronomía y los bellos paisajes.';
    } else if (lng >= 8.0 && lng <= 15.0 && lat >= 47.0 && lat <= 55.0) { // Alemania
      return '¡Bienvenido a Alemania!\n\n' +
             'Aquí se habla alemán como idioma principal.\n' +
             'Otros países donde se habla alemán: Austria, Suiza, Liechtenstein.\n' +
             'Descubre la historia y la modernidad de este país fascinante.';
    } else if (lng >= 2.5 && lng <= 6.5 && lat >= 49.5 && lat <= 51.5) { // Bélgica
      return '¡Bienvenido a Bélgica!\n\n' +
             'Aquí se habla francés y flamenco.\n' +
             'Explora su rica cultura y arquitectura.';
    } else if (lng >= 5.9 && lng <= 10.5 && lat >= 45.8 && lat <= 47.8) { // Suiza
      return '¡Bienvenido a Suiza!\n\n' +
             'En Suiza se hablan cuatro idiomas oficiales: alemán, francés, italiano y romanche.\n' +
             'Disfruta de los hermosos paisajes de los Alpes.';
    } else if (lng >= -141.0 && lng <= -52.0 && lat >= 41.6 && lat <= 83.1) { // Canadá
      return '¡Bienvenido a Canadá!\n\n' +
             'Aquí se habla inglés y francés.\n' +
             'Descubre su diversidad cultural y natural.';
    } else if (lng >= 137.0 && lng <= 150.0 && lat >= -43.0 && lat <= -10.0) { // Australia
      return '¡Bienvenido a Australia!\n\n' +
             'El inglés es el idioma principal aquí.\n' +
             '¡Explora sus impresionantes paisajes y fauna!';
    } else if (lng >= -8.0 && lng <= 2.0 && lat >= 50.0 && lat <= 60.0) { // Reino Unido
      return '¡Bienvenido al Reino Unido!\n\n' +
             'Aquí se habla inglés.\n' +
             'Descubre su rica historia y cultura.';
    } else if (lng >= 13.0 && lng <= 17.0 && lat >= 46.0 && lat <= 49.0) { // Austria
      return '¡Bienvenido a Austria!\n\n' +
             'Aquí se habla alemán.\n' +
             'Disfruta de su música y paisajes montañosos.';
    } else if (lng >= 73.66 && lng <= 135.05 && lat >= 18.16 && lat <= 53.55) { // China
      return '¡Bienvenido a China!\n\n' +
             'El idioma oficial es el chino mandarín.\n' +
             'Descubre su rica historia, cultura milenaria y deliciosa gastronomía. 🏮';
    } else {
      return 'Ubicación fuera de las áreas designadas.\n' +
             'Estamos trabajando para enseñarte el idioma de este país';
    }
  }
  
  
  
  
}