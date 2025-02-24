import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { jwtDecode } from 'jwt-decode';
import { TokenService } from './token.service';
import { LoginState } from './login-state.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private httpClient = inject(HttpClient);
  private apiUrlBase = environment.apiUrlBase;
  private token = inject(TokenService);
  private loginState = inject(LoginState);

  constructor(private http: HttpClient) {
    this.validateToken();
  }

  login(enteredEmail: string, enteredPassword: string) {
    // Mover a nuevo servicio
    return this.httpClient.post(`${this.apiUrlBase}/auth/local`, {
      // Devuelve un observable, recordar suscribirme.
      identifier: enteredEmail,
      password: enteredPassword,
    });
  }

  validateToken() {
    const token = this.token.getToken('token');
    let tokenIsValid;
    if (!token) {
      tokenIsValid = false;
      this.loginState.setLoggedInFalse();
    } else {
      const decodedToken = jwtDecode(token); // Descifra el token de Base 64 a json
      const expDate = decodedToken.exp! * 1000; // Fecha de expiración del token en milisegundos
      if (Date.now() > expDate) {
        this.token.deleteToken();
        tokenIsValid = false;
        this.loginState.setLoggedInFalse();
      } else {
        tokenIsValid = true;
        this.loginState.setLoggedInTrue();
      }
    }
    
    return tokenIsValid;
  }
}
