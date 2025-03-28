import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CartState } from '../../shared/interfaces/cartState.interface';

export const selectCartState = createFeatureSelector<CartState>('cart');  //Para ver el estado GLOBAL del carrito

export const selectCartItems = createSelector( //Para ver los elementos dentro del carrito
  selectCartState,
  state => state.cartItems
);

export const selectTotalCartItems = createSelector(selectCartState, state => //Para ver el número total de productos dentro del carrito
  state.cartItems.reduce((total, item) => total + item.quantity, 0)
);

export const selectOrder = createSelector( //Para seleccionar la Order asociada.
  selectCartState,
  state => state.order
);
