import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CartItem } from '../interfaces/cartItem.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrlBase = environment.apiUrlBase;
  private httpClient = inject(HttpClient);

  addProdToCart(id: number, item: CartItem, quantity: number) {
    return this.httpClient.post(`${this.apiUrlBase}/orders/${id}`, {
      item, quantity
    });
  }
  //AÑADIR LLAMADAS A LA API
  //Post para añadir items al carrito
  //Getters para consultar los productos que hay.

  deleteProdFromCart(orderItemId: number) {
    return this.httpClient.delete(`${this.apiUrlBase}/orders/${orderItemId}`);
  }

  loadCart(orderId: number) {
    return this.httpClient.get(`${this.apiUrlBase}/orders/${orderId}`);
  }
}
