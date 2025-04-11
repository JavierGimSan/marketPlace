import { createAction, props } from '@ngrx/store';
import { CartItem } from '../../shared/interfaces/cartItem.interface';

export const createOrderRequest = createAction(
  '[Cart] Create Order Request',
  props<{ quantity: number; date: Date; state: string, price: number }>()
);

export const createOrderSuccess = createAction(
  '[Cart] Create Order Success',
  props<{ quantity: number; date: Date; state: string; documentId: string, price: number }>()
);

export const createOrderError = createAction(
  '[Cart] Create Order Error',
  props<{ error: string }>()
);

export const updateOrderRequest = createAction(
  '[Cart] Update Order Request',
  props<{orderId: string, quantity: number, price: number}>()
);

export const updateOrderSuccess = createAction(
  '[Cart] Update Order Totals Success',
  props<{ quantity: number; price: number }>()
);

export const updateOrderError = createAction(
  '[Cart] Update Order Totals Error',
  props<{ error: string }>()
);

export const addToCart = createAction(
  //Desencadena el proceso de añadir un producto.
  '[Cart] Add To Cart',
  props<{ productId: string, orderId: string; item: CartItem; quantity: number, author: string, name: string, image_url: string }>()
);

export const addToCartSuccess = createAction(
  //Action para añadir producto, paso un producto y su cantidad.
  '[Cart] Add To Cart Success',
  props<{ item: CartItem; quantity: number }>()
);

export const addToCartError = createAction(
  //Si hay un ERROR a la hora de AÑADIR un producto a la BBDD, se ejecuta esta action y no se modifica el store.
  '[Cart] Add To Cart Error',
  props<{ error: string }>()
);

export const deleteFromCartRequest = createAction( //Action para iniciar eliminación de producto.
    '[Cart] Delete from Cart Request',
    props<{documentId: string}>()
);

export const deleteFromCartSuccess = createAction( //Action para eliminar producto, paso el name del producto a eliminar.
    '[Cart] Delete from Cart Success',
    props<{documentId: string}>()
);

export const deleteFromCartError = createAction( //Si hay un ERROR a la hora de BORRAR un producto a la BBDD, se ejecuta esta action y no se modifica el store.
    '[Cart] Delete from Cart Error',
    props<{error: string}>()
);

export const loadCartRequest = createAction(
  '[Cart] Load Cart Requested',
);

export const loadCartSuccess = createAction(
  '[Cart] Load Cart Success',
  props<{ cartItems: CartItem[] }>()
);

export const loadCartError = createAction(
  '[Cart] Load Cart Error',
  props<{error: string}>()
);

