import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  private httpClient = inject(HttpClient);

  constructor(private router: Router) {}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  products = signal<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  productId = signal<any[]>([]);

  ngOnInit() {
    this.httpClient.get('http://localhost:1337/api/products').subscribe({
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

  showInfo() {
    this.httpClient.get('http://localhost:1337/api/products').subscribe({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      next: (response: any) => {
        this.products.set(response.data);
        this.productId.set(response.data[0]);
        console.log(this.productId);

      },
      error: error => {
        console.log('Error al recopilar productos', error);
      },
    });    
    this.router.navigate(['/product']);
  }
}
