import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../login/services/login.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  constructor(
    public service: LoginService,
    private router: Router) {

  }
  ngOnInit(): void {
    if (!localStorage.getItem('token'))
      this.router.navigateByUrl('/login');

    if (localStorage.getItem('usuario'))
      this.service.usuario.set(localStorage.getItem('usuario') ?? '');

  }

  logOut() {
    localStorage.clear();
    this.service.usuario.set('');
    this.router.navigateByUrl('/login');
  }
}
