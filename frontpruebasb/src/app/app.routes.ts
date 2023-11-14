import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ListarPeliculasComponent } from './peliculas-imdb/listar-peliculas/listar-peliculas.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'listar-peliculas', component: ListarPeliculasComponent }
];
