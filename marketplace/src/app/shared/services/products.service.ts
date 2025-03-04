import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private httpClient = inject(HttpClient);
  private apiUrlBase = environment.apiUrlBase;

  loadProducts() {
    return this.httpClient.get(`${this.apiUrlBase}/products`);
  }

  loadProduct(productId: string) {
    return this.httpClient.get(`${this.apiUrlBase}/products${productId}`);
  }
}
