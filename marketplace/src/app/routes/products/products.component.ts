import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../../shared/services/products.service';

@Component({
  selector: 'app-products',
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  private httpClient = inject(HttpClient);
  private productsService = inject(ProductsService);

  constructor(private router: Router) {}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  products = signal<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  productId = signal<any[]>([]);

  isFetching = signal(false);

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
