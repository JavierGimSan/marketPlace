import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  addToCart,
  addToCartError,
  addToCartSuccess,
  createOrderError,
  createOrderRequest,
  createOrderSuccess,
  // deleteFromCartError,
  // deleteFromCartRequest,
  // deleteFromCartSuccess,
  // getCartError,
  // getCartRequest,
  // getCartSuccess,
} from '../actions/cart.actions';
import { CartService } from '../../shared/services/cart.service';
import { catchError, map, of, switchMap } from 'rxjs';
import { selectCartItems } from '../selectors/cart.selectors';
import { Store, select } from '@ngrx/store';

@Injectable()
export class CartEffects {
  private actions$ = inject(Actions);
  private store = inject(Store);
  constructor(private cartService: CartService) {}

  createOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createOrderRequest),
      switchMap(action =>
        this.cartService
          .createOrder(action.quantity, action.date, action.state)
          .pipe(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            map((orderResponse: any) => {
              console.log('TEST: Datos enviados al reducer:', {
                quantity: orderResponse.data.quantity,
                date: orderResponse.data.date,
                state: orderResponse.data.state,
                documentId: orderResponse.data.id,
              });
              console.log('CONTENIDO ORDER: ', orderResponse);
              return createOrderSuccess({
                quantity: orderResponse.data.quantity,
                date: orderResponse.data.date,
                state: orderResponse.data.state,
                documentId: orderResponse.data.documentId,
              });
            }),
            catchError(() => {
              return of(
                createOrderError({
                  error: 'Error al crear la orden',
                })
              );
            })
          )
      )
    )
  );

  addToCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addToCart),
      switchMap(action => {
        this.store.pipe(select(selectCartItems));
        console.log('TEST action: ', action);
        return this.cartService
          .createOrderItem(
            action.quantity,
            action.item.price,
            action.item.documentId,
            action.orderId,
            action.item.author,
            action.item.name,
            action.item.image_url
          )
          .pipe(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            map((resp: any) => {
              console.log('TESTESTEST!!!', resp.data);
              return addToCartSuccess({
                item: resp.data,
                quantity: resp.data.total_quantity,
              });
            }),
            catchError(() => {
              return of(
                addToCartError({
                  error: 'Error al añadir producto al carrito',
                })
              );
            })
          );
      })
    )
  );

  //   deleteCart$ = createEffect(() =>
  //     this.actions$.pipe(
  //       ofType(deleteFromCartRequest),
  //       exhaustMap(() =>
  //         this.cartService.deleteProdFromCart().pipe(
  //           // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //           map((resp: any) => {
  //             return deleteFromCartSuccess(resp);
  //           }),
  //           catchError(() => {
  //             return of(deleteFromCartError({
  //               error: 'Error al eliminar producto del carrito'}));
  //           })
  //         )
  //       )
  //     )
  //   );
}
