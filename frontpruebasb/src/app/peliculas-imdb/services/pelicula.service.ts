import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeliculaService {

  private apiUrl = 'https://localhost:7145/api/IMDB';
  constructor(private http: HttpClient) { }

  buscar(nombre: string, pagina: number): Observable<any> {
    const endpoint = '/buscar-nombre';
    return this.http.get<any>(`${this.apiUrl}${endpoint}?nombre=${nombre}&pagina=${pagina}`);
  }

  buscarDetalle(codigo: string): Observable<any> {
    const endpoint = '/buscar-codigo';
    return this.http.get<any>(`${this.apiUrl}${endpoint}?codigo=${codigo}`);
  }
}
