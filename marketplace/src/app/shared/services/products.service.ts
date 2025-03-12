import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Product } from '../interfaces/product.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private httpClient = inject(HttpClient);
  private apiUrlBase = environment.apiUrlBase;

  loadProducts() {
    return this.httpClient.get(`${this.apiUrlBase}/products`);
  }

  loadProduct(productId: string):Observable<Product> {
    return this.httpClient.get<Product>(`${this.apiUrlBase}/products/${productId}`);
  }

  loadProductPromotions(productId: string) {
    return this.httpClient.get(
      `${this.apiUrlBase}/products?populate=*&filters[documentId]=${productId}`
    );
  }
}
