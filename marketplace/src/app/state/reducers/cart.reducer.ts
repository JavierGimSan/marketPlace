import { createReducer, on } from '@ngrx/store';
import { initialCartState } from '../app.state';
import { addToCartSuccess, createOrderSuccess, deleteFromCartSuccess, loadCartSuccess,  } from '../actions/cart.actions'; //Acordarme de importar deleteFromCartSuccess

export const cartReducer = createReducer(
  initialCartState,

  on(loadCartSuccess, (state, {cartItems}) => ({
    ...state,
    cartItems,
  })),

  on(createOrderSuccess, (state, { quantity, date, state: orderState, documentId, price }) => {
    console.log('Actualizando el estado:', { quantity, date, state, documentId, price });
    return {
      ...state,
      order: {
        quantity,
        date,
        state: orderState,
        documentId,
        price,
      },
    };
  }),

  on(addToCartSuccess, (state, { item, quantity }) => { //Añadir producto al carrito
    const existingIndex = state.cartItems.findIndex(cartItem => cartItem.name === item.name);
    console.log("QUANTITY", quantity);
    console.log("CART ITEMS???",state.cartItems)
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
  
  on(deleteFromCartSuccess, (state, { documentId }) => {
    const updatedCartItems = state.cartItems.filter(item => item.documentId !== documentId);
    console.log('Cart items after deletion:', updatedCartItems, '----', documentId);
    
    return {
      ...state,
      cartItems: updatedCartItems
    };
  })
);
