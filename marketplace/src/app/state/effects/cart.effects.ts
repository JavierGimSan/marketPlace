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
import { catchError, exhaustMap, map, of } from 'rxjs';

@Injectable()
export class CartEffects {
  private actions$ = inject(Actions);
  constructor(private cartService: CartService) {}

  createOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createOrderRequest),
      exhaustMap(action =>
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
      exhaustMap(action => {
        console.log("TEST action: ", action);
        return this.cartService
          .createOrderItem(
            action.quantity,
            action.item.price,
            action.item.documentId,
            action.orderId
          )
          .pipe(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            map((resp: any) => {
              return addToCartSuccess({
                item: resp.item,
                quantity: resp.quantity,
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

  //   loadCart$ = createEffect(() =>
  //     this.actions$.pipe(
  //       ofType(getCartRequest),
  //       exhaustMap(() =>
  //         this.cartService.loadCart().pipe(
  //           // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //           map((resp: any) => {
  //             return getCartSuccess(resp);
  //           }),
  //           catchError(() => {
  //             return of(getCartError({
  //               error: 'Error al cargar carrito'}));
  //           })
  //         )
  //       )
  //     )
  //   );

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
