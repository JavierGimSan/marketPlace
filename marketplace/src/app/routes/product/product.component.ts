import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { ErrorImage } from '../../shared/services/error-image.service';

@Component({
  selector: 'app-product',
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  product: any;
  private productsService = inject(ProductsService);
  private errorImage = inject(ErrorImage);

  isFetching = signal(false);

  loadError = false;
  errorImageUrl = this.errorImage.getErrorImage();


  ngOnInit() {
    this.isFetching.set(true);
    const url = window.location.href;
    const productId = url.split('product')[1];

    this.productsService.loadProduct(productId).subscribe({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      next: (response: any) => {
        this.product = response.data;
      },error: error => {
        console.log('Error al recopilar productos', error);
        this.loadError = true;
        this.isFetching.set(false);

      },
      complete: () => {
        this.isFetching.set(false);
      }
    });
  }  
}
