import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { PeliculaService } from '../services/pelicula.service';
import { BehaviorSubject } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-detalle-pelicula',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './detalle-pelicula.component.html',
  styleUrl: './detalle-pelicula.component.scss'
})
export class DetallePeliculaComponent implements OnInit {
  movie: any;

  private comentariosSubject = new BehaviorSubject<string[]>([]);
  comentarios: any = [];
  nuevoComentario = '';
  comentarioEditado = '';
  comentarioEditadoIndex = -1;
  codigoPelicula: string | null = null;
  constructor(private activatedRoute: ActivatedRoute,
    private service: PeliculaService) {

  }
  ngOnInit(): void {
    this.codigoPelicula = this.activatedRoute.snapshot.paramMap.get('codigo');
    this.buscarDetalle();
    this.buscarComentarios();
  }

  buscarDetalle() {
    if (this.codigoPelicula) {
      this.service.buscarDetalle(this.codigoPelicula).subscribe(res => {
        if (res.success) {
          this.movie = res.data;
        }
      });
    }
  }

  buscarComentarios() {
    if (this.codigoPelicula) {
      this.service.buscarComentarios(this.codigoPelicula).subscribe(res => {
        if (res.success) {
          this.comentarios = res.data;
        }
      });
    }
  }

  agregarComentario(): void {
    if (this.nuevoComentario.trim() !== '') {
      this.service.agregarComentarios(this.movie.imdbID, this.nuevoComentario).subscribe(res => {
        this.buscarComentarios();
      });
      this.nuevoComentario = '';
    }
  }

  iniciarEdicion(index: number): void {
    this.comentarioEditadoIndex = index;
    this.comentarioEditado = this.comentarios[index].comentario;
  }

  cancelarEdicion(): void {
    this.comentarioEditadoIndex = -1;
    this.comentarioEditado = '';
  }

  guardarEdicion(id: string): void {
    if (this.comentarioEditado.trim() !== '') {
      // this.service.editarComentario(this.comentarioEditadoIndex, this.comentarioEditado);

      this.comentarios[this.comentarioEditadoIndex].comentario = this.comentarioEditado;
      // this.comentariosSubject.next(comentarios);

      this.service.editarComentarios(id, this.comentarioEditado).subscribe(res => {
        this.buscarComentarios();
      });
      this.cancelarEdicion();
    }
  }

  eliminarComentario(index: number): void {
    const id = this.comentarios[index].id;
    this.comentarios.splice(index, 1);
    this.service.eliminarComentarios(id).subscribe();
    // this.comentarios.next(comentarios);
    // this.service.eliminarComentario(index);
  }
}
