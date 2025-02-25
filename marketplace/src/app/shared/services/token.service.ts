import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(token: string): string | null {
    return localStorage.getItem(token);
  }

  deleteToken() {
    localStorage.removeItem('token');
  }
}
