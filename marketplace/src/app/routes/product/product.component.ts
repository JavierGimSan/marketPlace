import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';

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
  
  ngOnInit() {
    const url = window.location.href;
    const productId = url.split('product')[1];

    this.productsService.loadProduct(productId).subscribe({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      next: (response: any) => {
        this.product = response.data;
      }
    })
  }  
}
