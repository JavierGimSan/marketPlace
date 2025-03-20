import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CartState } from '../../shared/interfaces/cartState.interface';

export const selectCartState = createFeatureSelector<CartState>('cart');

export const selectCartItems = createSelector(
  selectCartState,
  (state) => state.cartItems
);

export const selectCartTotalItems = createSelector(
  selectCartItems,
  (cartItems) => cartItems.reduce((total, item) => total + item.quantity, 0)
);