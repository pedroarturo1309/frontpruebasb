import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ListarPeliculasComponent } from './peliculas-imdb/listar-peliculas/listar-peliculas.component';
import { DetallePeliculaComponent } from './peliculas-imdb/detalle-pelicula/detalle-pelicula.component';
import { authGuard } from './authentication/auth.guard';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'listar-peliculas', component: ListarPeliculasComponent, canActivate: [authGuard] },
  { path: 'detalle-pelicula/:codigo', component: DetallePeliculaComponent }
];
