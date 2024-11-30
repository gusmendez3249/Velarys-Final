import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css']
})
export class CountryListComponent implements OnInit {
  countries: any[] = []; // Lista de países
  isLoading: boolean = true; // Indicador de carga

  constructor(private countriesService: CountriesService) {}

  ngOnInit(): void {
    this.loadCountries();
  }

  // Método para cargar los países desde la API
  loadCountries(): void {
    this.countriesService.getAllCountries().subscribe(
      (data) => {
        this.countries = data.map((country: any) => ({
          name: country.name.common,
          capital: country.capital,
          region: country.region,
          population: country.population,
          languages: country.languages,
          flags: country.flags,
        }));
        this.isLoading = false;
      },
      (error) => {
        console.error('Error al obtener los países:', error);
        this.isLoading = false;
      }
    );
  }

  // Método para obtener los idiomas como una cadena separada por comas
  getLanguages(languages: any): string {
    return Object.values(languages).join(', ');
  }
}