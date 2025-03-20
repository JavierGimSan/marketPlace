import { createAction, props } from '@ngrx/store';
import { CartItem } from '../../shared/interfaces/cartItem.interface';

export const addToCart = createAction(
    '[Cart] Add To Cart',
    props<{item: CartItem, quantity: number}>()
);
