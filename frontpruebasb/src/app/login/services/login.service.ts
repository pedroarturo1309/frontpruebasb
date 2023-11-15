import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'https://localhost:7145/';
  public usuario = signal('');
  constructor(private http: HttpClient) { }

  iniciarConGoogle() {
    const endpoint = 'account/login-google';
    window.location.href = this.apiUrl + endpoint;
  }

  iniciarConMicrosoft() {
    const endpoint = 'account/login-microsoft';
    window.location.href = this.apiUrl + endpoint;
  }
}
