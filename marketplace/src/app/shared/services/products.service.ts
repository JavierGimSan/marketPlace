import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: "root",
})

export class ProductsService {

    private httpClient = inject(HttpClient);

    loadProducts(){
        return this.httpClient.get('http://localhost:1337/api/products');
    }

    loadProduct(productId: string){
        return this.httpClient.get(`http://localhost:1337/api/products${productId}`);
    }

}