import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  constructor() { }
  createToken(token: string) {
    localStorage.setItem('token', token);
  }
  getToken(): boolean {
    return !!localStorage.getItem('token');
  }
  getToken2(): string {
    return localStorage.getItem('token');
  }
  destroyToken() {
    localStorage.removeItem('token');
  }
}
