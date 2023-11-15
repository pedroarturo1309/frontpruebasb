import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginService } from './services/login.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(
    private serivce: LoginService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    let token = activatedRoute.snapshot.queryParamMap.get('authResult');
    let usuario = activatedRoute.snapshot.queryParamMap.get('usuario');

    if (token)
      localStorage.setItem('token', token);

    if (usuario) {
      this.serivce.usuario.set(usuario);
      localStorage.setItem('usuario', usuario);
    }

    if (localStorage.getItem('token'))
      router.navigateByUrl('/listar-peliculas');

    if (localStorage.getItem('usuario'))
      this.serivce.usuario.set(localStorage.getItem('usuario') ?? '');



  }

  google() {
    this.serivce.iniciarConGoogle()
  }

  microsoft() {
    this.serivce.iniciarConMicrosoft()
  }
}
