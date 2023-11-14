import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PeliculaService } from '../services/pelicula.service';

@Component({
  selector: 'app-detalle-pelicula',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-pelicula.component.html',
  styleUrl: './detalle-pelicula.component.scss'
})
export class DetallePeliculaComponent {
  movie: any;
  constructor(private activatedRoute: ActivatedRoute,
    private service: PeliculaService) {
    let codigo = activatedRoute.snapshot.paramMap.get('codigo');
      console.log(codigo);
    this.buscarDetalle(codigo);
  }

  buscarDetalle(codigo: string | null) {

    if(codigo) {
      this.service.buscarDetalle(codigo).subscribe(res => {
        if(res.success) {
          this.movie = res.data;
        }
      });
    }

  }
}
