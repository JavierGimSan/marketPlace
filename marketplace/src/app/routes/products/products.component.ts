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

  ngOnInit() {
    this.productsService.loadProducts().subscribe({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      next: (response: any) => {
        console.log(response);
        this.products.set(response.data);
      },
      error: error => {
        console.log('Error al recopilar productos', error);
      },
    });
  }

  showInfo(productId: string) { //Al hacer clic en un producto, extrae su documentId y lo pasa como argunmento
    this.productsService.loadProduct(`/${productId}`).subscribe({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      next: (response: any) => {
        this.productId.set(response.data);
        console.log(response.data.documentId);
        console.log(this.productId());

      },
      error: error => {
        console.log('Error al cargar producto', error);
      },
    });    
    this.router.navigate([`/product/${productId}`]);
  }
}
