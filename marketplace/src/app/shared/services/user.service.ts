import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private httpClient = inject(HttpClient);
  private tokenService = inject(TokenService);
  private apiUrlBase = environment.apiUrlBase;

  getUser() {
    const token = this.tokenService.getToken('token');
    if (!token) {
      throw new Error('No hay token guardado');
    } else {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`, //El endpoint por sí solo me da error, necesita autorización. Por eso incluir los headers.
      });
      return this.httpClient.get(`${this.apiUrlBase}/users/me`, { headers });
    }
  }
}
