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

  buscarComentarios(codigo: string): Observable<any> {
    const endpoint = '/buscar-comentarios';
    return this.http.get<any>(`${this.apiUrl}${endpoint}?codigo=${codigo}`);
  }

  agregarComentarios(codigoPelicula: string, comentario: string): Observable<any> {
    const endpoint = '/guardar-comentario';
    return this.http.post<any>(`${this.apiUrl}${endpoint}`, {id: 0, codigoPelicula, comentario });
  }

  editarComentarios(id: string, comentario: string): Observable<any> {
    const endpoint = '/editar-comentario';
    return this.http.put<any>(`${this.apiUrl}${endpoint}`, { id, comentario });
  }

  eliminarComentarios(id: string): Observable<any> {
    const endpoint = '/eliminar-comentario';
    return this.http.delete<any>(`${this.apiUrl}${endpoint}?id=${id}`);
  }
}
