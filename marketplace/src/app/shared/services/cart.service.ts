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

  createOrder(quantity: number, date: Date, state: string) {
    return this.httpClient.post(`${this.apiUrlBase}/orders`, {
      data: {
        quantity,
        date,
        state,
      }
    });
  }

  addProdToCart( item: CartItem, quantity: number) {
    return this.httpClient.put(`${this.apiUrlBase}/orders/`, {
      data: {
        item, quantity 
      }
    });
  }
  //AÑADIR LLAMADAS A LA API
  //AÑADIR TOKEN AUTH, INTERCEPTOR
  //Post para añadir items al carrito
  //Getters para consultar los productos que hay.

  deleteProdFromCart(orderItemId: number) {
    return this.httpClient.delete(`${this.apiUrlBase}/orders/${orderItemId}`);
  }

  loadCart(orderId: number) {
    return this.httpClient.get(`${this.apiUrlBase}/orders/${orderId}`);
  }
}
