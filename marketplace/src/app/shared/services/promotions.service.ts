import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PromotionsService {
  private httpClient = inject(HttpClient);
  private apiUrlBase = environment.apiUrlBase;

  loadPromotions() {
    return this.httpClient.get(`${this.apiUrlBase}/promotions`);
  }

  loadPromotion(promotionId: string) {
    return this.httpClient.get(`${this.apiUrlBase}/promotions${promotionId}`);
  }

  loadPromotionProducts(promotionId: string) {
    return this.httpClient.get(
      `${this.apiUrlBase}/promotions?populate=*&filters[documentId]=${promotionId}`
    );
  }

  loadProductPromotions(productId: string){
    return this.httpClient.get(
        `${this.apiUrlBase}/promotions?populate=*&filters[documentId]=${productId}`
      );
  }
  
}
