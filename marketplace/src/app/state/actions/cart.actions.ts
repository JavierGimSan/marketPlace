/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAction, props } from '@ngrx/store';
import { CartItem } from '../../shared/interfaces/cartItem.interface';

/* ******************* CREAR ORDER ******************* */ 

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

/* ******************* ACTUALIZAR ORDER ******************* */

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

/* ******************* AÑADIR CART-ITEM AL CARRITO ******************* */

export const addToCart = createAction( //Desencadena el proceso de añadir un producto.
  '[Cart] Add To Cart',
  props<{ productId: string, orderId: string; item: CartItem; quantity: number, author: string, name: string, image_url: string }>()
);

export const addToCartSuccess = createAction( //Action para añadir producto, paso un producto y su cantidad.
  '[Cart] Add To Cart Success',
  props<{ item: CartItem; quantity: number }>()
);

export const addToCartError = createAction( //Si hay un ERROR a la hora de AÑADIR un producto a la BBDD, se ejecuta esta action y no se modifica el store.
  
  '[Cart] Add To Cart Error',
  props<{ error: string }>()
);

/* ******************* BORRAR CART-ITEM DEL CARRITO ******************* */

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

/* ******************* CARGAR CARRITO ******************* */

export const loadCartRequest = createAction( //Desencadena la recuperación de un carrito
  '[Cart] Load Cart Requested',
);

export const loadCartSuccess = createAction( //Action para recuperar un carrito al INICIAR la aplicación
  '[Cart] Load Cart Success',
  props<{ cartItems: CartItem[] }>()
);

export const loadCartError = createAction( // Si hay un error al recuperar un carrito, se ejecuta esta action.
  '[Cart] Load Cart Error',
  props<{error: string}>()
);

/* ******************* CARGAR ORDER ******************* */

export const loadOrderRequest = createAction(
  '[Cart] Load Order Request'
);

export const loadOrderSuccess = createAction(
  '[Cart] Load Order Seccess',
  props<{ order: any, cartItems: CartItem[] }>()
);

export const loadOrderError = createAction(
  '[Cart] Load Order Error',
  props<{error: string}>()
);