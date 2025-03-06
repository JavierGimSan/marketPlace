import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { PromotionsService } from '../promotions/promotions.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-promotion',
  imports: [],
  templateUrl: './promotion.component.html',
  styleUrl: './promotion.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PromotionComponent implements OnInit {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  promotionDiscount = signal<any>(0); //GUARDO EL DESCUENTO DE LA PROMOCIÓN PARA OPERAR CON EL PRECIO
  private promotionsService = inject(PromotionsService);

  constructor(private router: Router) {}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  promotions: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  promotionProducts = signal<any[]>([]);

  ngOnInit() {
    const url = window.location.href;
    const promotionId = url.split('promotion/')[1];
    // this.errorImageUrl = this.errorImage.getErrorImage();
    // this.isFetching.set(true);
    this.promotionsService.loadPromotionProducts(promotionId).subscribe({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      next: (response: any) => {
        this.promotionProducts.set(response.data[0].products);
      },
      // error: error => {
      //   console.log('Error al recopilar productos', error);
      //   this.loadError = true;
      //   this.isFetching.set(false);
      // },
      // complete: ()=> {
      //   this.isFetching.set(false);
      // }
    });

    this.promotionsService.loadPromotion(promotionId).subscribe({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      next: (response: any) => {
        console.log(typeof(response.data.discount));
        this.promotionDiscount.set(response.data.discount);
        console.log(typeof(this.promotionDiscount))
      }
    })

    // this.promotionsService.loadProductPromotions(productId).subscribe({
    //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //   next: (response: any) => {
    //     this.promotionProducts.set(response.data[0].products);
    //     console.log(response.data[0].products);
    //   },
    //   error: error => {
    //     console.log('Error al recopilar productos', error);
    //     //   this.loadError = true;
    //     //   this.isFetching.set(false);
    //   },
    //   // complete: ()=> {
    //   //   this.isFetching.set(false);
    //   // }
    // });
  }

  //MOSTRAR INFORMACIÓN DE UN PRODUCTO
  showInfo(productId: string) {
    this.router.navigate([`/product/${productId}`]);
  }
}
