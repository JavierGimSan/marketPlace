import { createReducer, on } from '@ngrx/store';
import { initialCartState } from '../app.state';
import { addToCart, deleteFromCart } from '../actions/cart.actions';

export const cartReducer = createReducer(
  initialCartState,
  on(addToCart, (state, { item, quantity }) => {
    const existingIndex = state.cartItems.findIndex(cartItem => cartItem.name === item.name);
    
    if (existingIndex !== -1) {
      const updatedCartItems = state.cartItems.map((cartItem, index) =>
        index === existingIndex
          ? { ...cartItem, quantity: cartItem.quantity + quantity }
          : cartItem
      );
      return {
        ...state,
        cartItems: updatedCartItems,
      };
    } else {
      return {
        ...state,
        cartItems: [...state.cartItems, { ...item, quantity }],
      };
    }
  }),

  on(deleteFromCart, (state, {name}) => ({
    ...state,
    cartItems: state.cartItems.filter(item => item.name !== name)
  }))
);
