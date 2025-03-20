import { createReducer, on } from '@ngrx/store';
import { initialCartState } from '../app.state';
import { addToCart } from '../actions/cart.actions';

export const cartReducer = createReducer(
  initialCartState,
  on(addToCart, (state, { cartItem }) => ({
    ...state,
    cartItems: [...state.cartItems, cartItem],
  }))
);
