import { createAction, props } from '@ngrx/store';
import { CartItem } from '../../shared/interfaces/cartItem.interface';

export const addToCart = createAction(
  '[Cart] Add To Cart',
  props<{ item: CartItem }>()
);

export const removeFromCart = createAction(
  '[Cart] Remove From Cart',
  props<{ itemId: string }>()
);

export const clearCart = createAction('[Cart] Clear Cart');