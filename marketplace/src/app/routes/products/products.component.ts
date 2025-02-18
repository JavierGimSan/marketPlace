import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-products',
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit{
  private httpClient = inject(HttpClient);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  products = signal<any[]>([]);

  ngOnInit(){
    this.httpClient.get('http://localhost:1337/api/products').subscribe({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      next: (response: any) => {
        console.log(response);
        this.products.set(response.data);
      },
      error: (error) => {
        console.log("Error al recopilar productos", error);
      }
    });
  }
  
  
}
