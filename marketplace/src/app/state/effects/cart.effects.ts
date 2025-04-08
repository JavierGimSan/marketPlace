import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  addToCart,
  addToCartError,
  addToCartSuccess,
  createOrderError,
  createOrderRequest,
  createOrderSuccess,
  deleteFromCartError,
  deleteFromCartRequest,
  deleteFromCartSuccess,
  // deleteFromCartError,
  // deleteFromCartRequest,
  // deleteFromCartSuccess,
  // getCartError,
  // getCartRequest,
  // getCartSuccess,
} from '../actions/cart.actions';
import { CartService } from '../../shared/services/cart.service';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';

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
          .createOrder(action.quantity, action.date, action.state, action.price)
          .pipe(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            map((orderResponse: any) => {
              console.log('TEST: Datos enviados al reducer:', {
                quantity: orderResponse.data.quantity,
                date: orderResponse.data.date,
                state: orderResponse.data.state,
                documentId: orderResponse.data.id,
                price: orderResponse.data.price,
              });
              console.log('CONTENIDO ORDER: ', orderResponse);
              return createOrderSuccess({
                quantity: orderResponse.data.quantity,
                date: orderResponse.data.date,
                state: orderResponse.data.state,
                documentId: orderResponse.data.documentId,
                price: orderResponse.data.price,
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
      tap(action => console.log('Action recibida en addToCart:', action)),
      switchMap(action =>
        this.cartService.getOrderItems().pipe(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          switchMap((response: any) => {
            console.log('RESPONSE', response);
            const existingOrderItem = response.data.find(
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (orderItem: any) => {
                console.log(
                  'Comparación nombres: ',
                  orderItem.name,
                  ' - ',
                  action.item.name
                );
                return orderItem.name === action.item.name;
              }
            );

            if (existingOrderItem) {
              console.log('SI EXISTE');
              console.log('ORDER EXISTENTE: ', existingOrderItem);
              // Si el producto ya está en la orden, actualizamos su cantidad
              return this.cartService
                .updateOrderItem(
                  existingOrderItem.documentId,
                  existingOrderItem.total_quantity + action.quantity
                )
                .pipe(
                  tap(() => {
                    console.log(
                      'ACTUALIZAR CANTIDAD: ',
                      existingOrderItem.total_quantity,
                      '+',
                      action.quantity,
                      '=',
                      existingOrderItem.total_quantity + action.quantity
                    );
                  }),
                  map(() =>
                    addToCartSuccess({
                      item: {
                        ...existingOrderItem,
                        quantity:
                          existingOrderItem.total_quantity + action.quantity,
                      },
                      quantity: action.quantity,
                    })
                  ),
                  catchError(() =>
                    of(
                      addToCartError({
                        error:
                          'Error al actualizar la cantidad del producto en el carrito',
                      })
                    )
                  )
                );
            } else {
              // Si el producto no está en la orden, lo creamos
              console.log('RESPONSE 2: ', response);
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
                  map((resp: any) =>
                    addToCartSuccess({
                      item: resp.data,
                      quantity: resp.data.total_quantity,
                    })
                  ),
                  catchError(() =>
                    of(
                      addToCartError({
                        error: 'Error al añadir producto al carrito',
                      })
                    )
                  )
                );
            }
          }),
          catchError(() =>
            of(
              addToCartError({
                error: 'Error al obtener los items del carrito',
              })
            )
          )
        )
      )
    )
  );

  deleteCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteFromCartRequest),
      tap(action => {
        console.log('ACTION RECIBIDA EN DELETE: ', action);
      }),
      switchMap(action =>
        this.cartService.deleteProdFromCart(action.documentId).pipe(
          map(() => {
            return deleteFromCartSuccess({ documentId: action.documentId });
          }),
          catchError(() => {
            return of(
              deleteFromCartError({
                error: 'Error al eliminar producto del carrito',
              })
            );
          })
        )
      )
    )
  );
}
