import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private serivce: LoginService) {

  }

  google() {
    this.serivce.iniciarConGoogle().subscribe(console.log);
  }
}
