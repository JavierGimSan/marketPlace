import { createReducer, on } from '@ngrx/store';
import { initialCartState } from '../app.state';
import { addToCartSuccess } from '../actions/cart.actions'; //Acordarme de importar deleteFromCartSuccess

export const cartReducer = createReducer(
  initialCartState,

  on(addToCartSuccess, (state, { item, quantity }) => { //Añadir producto al carrito
    const existingIndex = state.cartItems.findIndex(cartItem => cartItem.name === item.name);
    if (existingIndex !== -1) {
      const updatedCartItems = state.cartItems.map((cartItem, index) =>
        index === existingIndex
          ? { ...cartItem, quantity: cartItem.quantity + quantity } //Si el producto ya está en el carrito se le suma la cantidad indicada.
          : cartItem
      );
      return {
        ...state,
        cartItems: updatedCartItems,
      };
    } else {
      return {
        ...state,
        cartItems: [...state.cartItems, { ...item, quantity }], //Si no está en el carrito, se añade al array de cartItems
      };
    }
  }),
  
  // on(deleteFromCartSuccess, (state, {name}) => ({ //Eliminar producto del carrito
  //   ...state,
  //   cartItems: state.cartItems.filter(item => item.name !== name)
  // }))
);
