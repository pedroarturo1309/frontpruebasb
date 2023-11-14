import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeliculaService } from '../services/pelicula.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listar-peliculas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './listar-peliculas.component.html',
  styleUrl: './listar-peliculas.component.scss'
})
export class ListarPeliculasComponent implements OnInit {
  movies: any = [];
  totalPages: number = 1;
  nombrePelicula = 'hulk';
  constructor(private service: PeliculaService) {

  }
  ngOnInit(): void {
    this.buscar();
  }

  buscar() {
    this.service.buscar(this.nombrePelicula, this.currentPage).subscribe(res => {
      console.log(res)
      if (res.success) {
        this.movies = res.data.search;
        this.totalPages = res.data.totalResults
      }
    });
  }

  itemsPerPage = 10; // Número de películas por página
  currentPage = 1; // Página actual

  // get totalPages(): number {
  //   return Math.ceil(this.movies.length / this.itemsPerPage);
  // }

  // getCurrentPageMovies(): any[] {
  //   const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  //   const endIndex = startIndex + this.itemsPerPage;
  //   return this.movies.slice(startIndex, endIndex);
  // }

  changePage(direction: 'left' | 'right'): void {
    if (direction === 'left' && this.currentPage > 1) {
      this.currentPage--;
    } else if (direction === 'right' && this.currentPage < this.totalPages) {
      this.currentPage++;
    }

    this.buscar();
  }
}
