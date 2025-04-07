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
      },
    });
  }

  getOrder(orderId: string) {
    return this.httpClient.get(`${this.apiUrlBase}/orders/${orderId}`);
  }

  updateOrder(documentId: string, quantity: number, date: Date, state: string) {
    return this.httpClient.put(`${this.apiUrlBase}/orders/${documentId}`, {
      data: {
        quantity,
        date,
        state,
      },
    });
  }

  deleteOrder(documentId: string){
    return this.httpClient.delete(`${this.apiUrlBase}/orders/${documentId}`)
  }

  createOrderItem(
    total_quantity: number,
    price: number,
    productId: string,
    orderId: string,
    author: string,
    name: string,
    image_url: string
  ) {
    console.log(
      'Contenido a publicar en orderItem',
      total_quantity,
      price,
      productId,
      orderId,
      author,
      name,
      image_url
    );
    return this.httpClient.post(`${this.apiUrlBase}/order-items`, {
      data: {
        total_quantity,
        price,
        product: productId,
        order: orderId,
        author,
        name,
        image_url,
      },
    });
  }

  getOrderItems(){
    return this.httpClient.get(`${this.apiUrlBase}/order-items`);
  }

  updateOrderItem(documentId: string, total_quantity: number) {
    console.log("DOCUMENT ID: ", documentId);
    return this.httpClient.put(`${this.apiUrlBase}/order-items/${documentId}`, {
      data: {
        total_quantity,
      },
    });
  }

  deleteOrderItem(documentId: string) {
    return this.httpClient.delete(`${this.apiUrlBase}/order-items/${documentId}`)
  }

  addProdToCart(item: CartItem, quantity: number) {
    //FALTA RECUPERAR orderID PARA ACTUALIZAR LA ORDER CON PRODUCTO.
    return this.httpClient.put(`${this.apiUrlBase}/orders/`, {
      data: {
        item,
        quantity,
      },
    });
  }

  deleteProdFromCart(orderItemId: string) {
    return this.httpClient.delete(`${this.apiUrlBase}/order-items/${orderItemId}`);
  }

  loadCart(orderId: number) {
    return this.httpClient.get(`${this.apiUrlBase}/orders/${orderId}`);
  }
}
