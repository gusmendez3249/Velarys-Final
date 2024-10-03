import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class IpService {
  private apiUrl = 'http://localhost:3000/api/ipInfo'; // URL de tu servidor
  private ipifyUrl = 'https://api.ipify.org?format=json'; // URL para obtener la IP pública

  constructor(private http: HttpClient) {}

  // Método para obtener la información de la IP
  getIpInfo(ip?: string): Observable<any> {
    if (ip) {
      // Si se proporciona una IP, utilizamos esa IP
      return this.http.get<any>(`${this.apiUrl}?ip=${ip}`);
    } else {
      // Si no hay una IP proporcionada, obtenemos la IP pública primero
      return this.getPublicIp().pipe(
        switchMap((response: any) => {
          const publicIp = response.ip;
          return this.http.get<any>(`${this.apiUrl}?ip=${publicIp}`);
        })
      );
    }
  }

  // Método para obtener la IP pública usando el servicio ipify
  private getPublicIp(): Observable<any> {
    return this.http.get<any>(this.ipifyUrl);
  }
}