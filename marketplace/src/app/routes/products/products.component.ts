import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../../shared/services/products.service';
import { ErrorImage } from '../../shared/services/error-image.service';

@Component({
  selector: 'app-products',
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  private productsService = inject(ProductsService);
  private errorImage = inject(ErrorImage);

  constructor(private router: Router) {}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  products = signal<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  productId = signal<any[]>([]);

  isFetching = signal(false);

  loadError = false;
  errorImageUrl = this.errorImage.getErrorImage();

  ngOnInit() {
    this.isFetching.set(true);
    this.productsService.loadProducts().subscribe({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      next: (response: any) => {
        console.log(response);
        this.products.set(response.data);
      },
      error: error => {
        console.log('Error al recopilar productos', error);
        this.loadError = true;
        this.isFetching.set(false);        
      },
      complete: ()=> {
        this.isFetching.set(false);
      }
    });
  }

  showInfo(productId: string) {
    this.router.navigate([`/product/${productId}`]);
  }
}
