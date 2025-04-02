import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { ErrorImage } from '../../shared/services/error-image.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  addToCart,
  createOrderRequest,
} from '../../state/actions/cart.actions';
import { selectCartState } from '../../state/selectors/cart.selectors';
import { CartItem } from '../../shared/interfaces/cartItem.interface';
import { filter, map, of, switchMap, take } from 'rxjs';

@Component({
  selector: 'app-product',
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent implements OnInit {
  constructor(private store: Store) {}

  private productsService = inject(ProductsService);
  private errorImage = inject(ErrorImage);
  private router = inject(Router);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  product: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  promotions = signal<any[]>([]);
  isFetching = signal(false);

  loadError = false;
  errorImageUrl = this.errorImage.getErrorImage();

  url = window.location.href;
  productId = this.url.split('product/')[1];

  private _itemsCount = signal(0);

  ngOnInit() {
    this.isFetching.set(true);

    this.productsService.loadProduct(this.productId).subscribe({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      next: (response: any) => {
        this.product = response.data;
      },
      error: error => {
        console.log('Error al recopilar el producto', error);
        this.loadError = true;
        this.isFetching.set(false);
      },
      complete: () => {
        this.isFetching.set(false);
      },
    });

    this.productsService.loadProductPromotions(this.productId).subscribe({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      next: (response: any) => {
        this.promotions.set(response.data[0].promotions);
      },
    });
  }

  redirectPromotion(promotionId: string) {
    this.router.navigate([`/promotion/${promotionId}`]);
  }

  incrementItems() {
    //En el botón de cantidad, al pulsar '+', suma 1.
    this._itemsCount.set(this._itemsCount() + 1);
  }

  decrementItems() {
    //Al pulsar '-', resta 1.
    if (this._itemsCount() > 0) {
      this._itemsCount.set(this._itemsCount() - 1);
    }
  }

  get itemsCount() {
    //Devuelve la cantidad del producto EN EL QUE ESTAMOS ACTUALMENTE para ir acualizando cada vez que se pulsa '+' o '-'.
    return this._itemsCount();
  }

  setCountToZero() {
    this._itemsCount.set(0);
  }

  agregarAlCarrito() {
    this.store
      .select(selectCartState)
      .pipe(
        take(1),
        switchMap(state => {
          
          if (state.order) { // Si existe una orden, continuamos con ella
            return of(state.order.documentId);
          }

          
          const orderDetails = { // Si no existe, crear
            quantity: this._itemsCount(),
            date: new Date(),
            state: 'active',
          };

          this.store.dispatch(createOrderRequest(orderDetails));

          return this.store.select(selectCartState).pipe( // Esperamos a que se complete la creación
            filter(state => !!state.order),
            map(state => state.order!.documentId),
            take(1)
          );
        }),
        switchMap(orderId => {
          const productId = this.product.id;
          const cartItem: CartItem = {
            ...this.product,
            quantity: this._itemsCount(),
          };

          
          this.store.dispatch(
            addToCart({
              orderId,
              productId,
              item: cartItem,
              quantity: cartItem.quantity,
              author: cartItem.author,
              name: cartItem.name,
              image_url: cartItem.image_url
            })
          );

          return of(null); // Si no pongo el 'of(null)' se rompe la cadena y no funciona.
        })
      )
      .subscribe(() => {
        this.setCountToZero();
      });
  }
}
