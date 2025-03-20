import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { ErrorImage } from '../../shared/services/error-image.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { addToCart } from '../../state/actions/cart.actions';
import { selectCartItems } from '../../state/selectors/cart.selectors';
import { CartItem } from '../../shared/interfaces/cartItem.interface';

@Component({
  selector: 'app-product',
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent implements OnInit {

  constructor(private store: Store){}

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
    if(this._itemsCount() > 0){
      this._itemsCount.set(this._itemsCount() - 1);
    }
  }

  get itemsCount() {
    //Devuelve la cantidad del producto EN EL QUE ESTAMOS ACTUALMENTE para ir acualizando cada vez que se pulsa '+' o '-'.
    return this._itemsCount();
  }

  agregarAlCarrito(){
    const cartItem: CartItem = {
      ...this.product,
      quantity: this._itemsCount(),
    };

    this.store.dispatch(addToCart({item: cartItem, quantity: cartItem.quantity}));

    this.store.select(selectCartItems).subscribe(cartItems => {
      console.log(cartItems);
    });
  }

  // addToCart() {
  //   const cartItem: CartItem = {
  //     ...this.product,
  //     quantity: this.itemsCount,
  //   };
  //   if(cartItem.quantity != 0){ //Si en cantidad hay al menos 1, se añade el producto al carrito
  //     this.shoppingCartService.addToCart(cartItem);
  //   }
  //   console.log(cartItem);
  //   this.shoppingCartService.logCartItems();
  // }
//-------------------------------------------------------------------------------------



  // addToCart(productId:string){ //Suma la cantidad del producto al total del carrito. Si cantidad = 9, carrito =+ 9.
  //   this.productsService.loadProduct(productId).subscribe({
  //     next: (product) => {
  //       const cartItem: CartItem = {
  //         name: product.name,
  //         description: product.description,
  //         price: product.price,
  //         author: product.author,
  //         image_url: product.image_url,
  //         quantity: 1  // Inicializamos la cantidad en 1
  //       };
  //       this.shoppingCartService.addCartItem(cartItem);
  //     },
  //     error: (error) => {
  //       console.error('Error fetching product:', error);
  //     }
  //   });
  // }

  //   this.shoppingCartService.setCartState();
  //   this.shoppingCartService.setCountToZero();

  //   console.log(this.shoppingCartService.cartState());
  // }
}
