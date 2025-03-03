import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HomeBackgroundService {
  private httpClient = inject(HttpClient);
  private apiUrlBase = environment.apiUrlBase;

  loadBackgroundImage() {
    return this.httpClient.get(`${this.apiUrlBase}/home`);
  }
}