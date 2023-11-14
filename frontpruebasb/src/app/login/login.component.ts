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

    if (token)
      localStorage.setItem('token', token);

    if (localStorage.getItem('token'))
      router.navigateByUrl('/listar-peliculas');
  }

  google() {
    this.serivce.iniciarConGoogle().subscribe(console.log);
  }
}
