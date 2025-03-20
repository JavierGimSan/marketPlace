import { createAction, props } from '@ngrx/store';
import { CartItem } from '../../shared/interfaces/cartItem.interface';

export const addToCart = createAction( //Action para añadir producto, paso un producto y su cantidad.
    '[Cart] Add To Cart',
    props<{item: CartItem, quantity: number}>()
);

export const deleteFromCart = createAction( //Action para eliminar producto, paso el name del producto a eliminar.
    '[Cart] Delete from Cart',
    props<{name: string}>()
);
