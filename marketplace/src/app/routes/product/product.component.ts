import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { ErrorImage } from '../../shared/services/error-image.service';
import { Router } from '@angular/router';
import { ShoppingCartService } from '../../shared/services/shopping-cart.service';
import { CartItem } from '../../shared/interfaces/cartItem.interface';

@Component({
  selector: 'app-product',
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent implements OnInit{

  private productsService = inject(ProductsService);
  private errorImage = inject(ErrorImage);
  private router = inject(Router);
  private shoppingCartService = inject(ShoppingCartService);

  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  product: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  promotions = signal<any[]>([]);
  isFetching = signal(false);

  loadError = false;
  errorImageUrl = this.errorImage.getErrorImage();

  url = window.location.href;
  productId = this.url.split('product/')[1];
  
  ngOnInit() {
    this.isFetching.set(true);

    this.productsService.loadProduct(this.productId).subscribe({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      next: (response: any) => {
        this.product = response.data;
      },error: error => {
        console.log('Error al recopilar el producto', error);
        this.loadError = true;
        this.isFetching.set(false);

      },
      complete: () => {
        this.isFetching.set(false);
      }
    });

    this.productsService.loadProductPromotions(this.productId).subscribe({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      next: (response: any) => {
        console.log(response.data[0].promotions);
        this.promotions.set(response.data[0].promotions);
      }
    });
  }
  
  redirectPromotion(promotionId: string){
    this.router.navigate([`/promotion/${promotionId}`]);
  }

  incrementItems(){ //En el botón de cantidad, al pulsar '+', suma 1.
    this.shoppingCartService.incrementItems();
  }

  decrementItems(){ //Al pulsar '-', resta 1.
    this.shoppingCartService.decrementItems();
  }

  get itemsCount(){ //Devuelve la cantidad del producto EN EL QUE ESTAMOS ACTUALMENTE para ir acualizando cada vez que se pulsa '+' o '-'.
    return this.shoppingCartService.itemsCount;
  }

  addToCart(productId:string){ //Suma la cantidad del producto al total del carrito. Si cantidad = 9, carrito =+ 9.
    this.productsService.loadProduct(productId).subscribe({
      next: (product) => {
        const cartItem: CartItem = {
          name: product.name,
          description: product.description,
          price: product.price,
          author: product.author,
          image_url: product.image_url,
          quantity: 1  // Inicializamos la cantidad en 1
        };
        this.shoppingCartService.addCartItem(cartItem);
      },
      error: (error) => {
        console.error('Error fetching product:', error);
      }
    });
  }
  
  //   this.shoppingCartService.setCartState();
  //   this.shoppingCartService.setCountToZero();

  //   console.log(this.shoppingCartService.cartState());
  // }
}

