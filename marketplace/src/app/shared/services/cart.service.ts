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

  createOrderItem(total_quantity: number, price: number, productId: string, orderId: string){
    console.log("Contenido a publicar en orderItem", total_quantity,
      price,
      productId,
      orderId,)
    return this.httpClient.post(`${this.apiUrlBase}/order-items`,{
      data: {
        total_quantity,
        price,
        product: productId,
        order: orderId,
      },
    });
  }

  addProdToCart( item: CartItem, quantity: number) { //FALTA RECUPERAR orderID PARA ACTUALIZAR LA ORDER CON PRODUCTO.
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
