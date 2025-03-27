import { createAction, props } from '@ngrx/store';
import { CartItem } from '../../shared/interfaces/cartItem.interface';

export const createOrderRequest = createAction(
  '[Cart] Create Order Request',
  props<{ quantity: number; date: Date; state: string }>()
);

export const createOrderSuccess = createAction(
  '[Cart] Create Order Success',
  props<{ quantity: number; date: Date; state: string; documentId: string }>()
);

export const createOrderError = createAction(
  '[Cart] Create Order Error',
  props<{ error: string }>()
);

export const addToCart = createAction(
  //Desencadena el proceso de añadir un producto.
  '[Cart] Add To Cart',
  props<{ id: number; item: CartItem; quantity: number }>()
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

// export const deleteFromCartRequest = createAction( //Action para iniciar eliminación de producto.
//     '[Cart] Delete from Cart Request',
// );

// export const deleteFromCartSuccess = createAction( //Action para eliminar producto, paso el name del producto a eliminar.
//     '[Cart] Delete from Cart Error',
//     props<{name: string}>()
// );

// export const deleteFromCartError = createAction( //Si hay un ERROR a la hora de BORRAR un producto a la BBDD, se ejecuta esta action y no se modifica el store.
//     '[Cart] Delete from Cart Success',
//     props<{error: string}>()
// );

// export const getCartRequest = createAction( //Action para iniciar la carga de un carrito
//     '[Cart] Get Cart Request',
// );

// export const getCartSuccess = createAction( //Action para cargar carrito. Paso ? para cargar uno específico
//     '[Cart] Get Cart Success',
//     props<{}>()
// );

// export const getCartError = createAction( //Si va mal, se carga el error.
//     '[Cart] Get Cart Error',
//     props<{error: string}>()
// );
