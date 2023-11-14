import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'https://localhost:7145/';
  constructor(private http: HttpClient) { }

  iniciarConGoogle(): Observable<any> {
    const endpoint = 'account/login-google';
    return this.http.get<any>(`${this.apiUrl}${endpoint}`);
  }
}
