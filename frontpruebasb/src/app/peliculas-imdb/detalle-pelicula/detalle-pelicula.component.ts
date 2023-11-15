import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { PeliculaService } from '../services/pelicula.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-detalle-pelicula',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
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
  constructor(private activatedRoute: ActivatedRoute,
    private service: PeliculaService) {

  }
  ngOnInit(): void {
    let codigo = this.activatedRoute.snapshot.paramMap.get('codigo');
    console.log(codigo);
    this.buscarDetalle(codigo);
    this.buscarComentarios(codigo);
  }

  buscarDetalle(codigo: string | null) {
    if (codigo) {
      this.service.buscarDetalle(codigo).subscribe(res => {
        if (res.success) {
          this.movie = res.data;
        }
      });
    }
  }

  buscarComentarios(codigo: string | null) {
    if (codigo) {
      this.service.buscarComentarios(codigo).subscribe(res => {
        if (res.success) {
          this.comentarios = res.data;
          this.comentariosSubject.next(res.data);
        }
      });
    }
  }

  agregarComentario(): void {
    if (this.nuevoComentario.trim() !== '') {
      const comentarios = this.comentariosSubject.value;
      comentarios.push(this.nuevoComentario);
      this.comentariosSubject.next(comentarios);
      this.nuevoComentario = '';
    }
  }

  iniciarEdicion(index: number): void {
    this.comentarioEditadoIndex = index;
    this.comentarioEditado = this.comentarios[index];
  }

  cancelarEdicion(): void {
    this.comentarioEditadoIndex = -1;
    this.comentarioEditado = '';
  }

  guardarEdicion(): void {
    if (this.comentarioEditado.trim() !== '') {
      // this.service.editarComentario(this.comentarioEditadoIndex, this.comentarioEditado);

      const comentarios = this.comentariosSubject.value;
      comentarios[this.comentarioEditadoIndex] = this.comentarioEditado;
      this.comentariosSubject.next(comentarios);
      this.cancelarEdicion();
    }
  }

  eliminarComentario(index: number): void {
    const comentarios = this.comentariosSubject.value;
    comentarios.splice(index, 1);
    this.comentariosSubject.next(comentarios);
    // this.service.eliminarComentario(index);
  }
}
