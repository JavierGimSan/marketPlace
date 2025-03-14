import { Component, inject, OnInit, signal } from '@angular/core';
import { PromotionsService } from '../../shared/services/promotions.service';
import { Router } from '@angular/router';
import { ErrorImage } from '../../shared/services/error-image.service';

@Component({
  selector: 'app-promotions',
  imports: [],
  templateUrl: './promotions.component.html',
  styleUrl: './promotions.component.scss'
})
export class PromotionsComponent implements OnInit{
  constructor(private router: Router){}

  promotionsService = inject(PromotionsService);
  
  private errorImage = inject(ErrorImage);

  isFetching = signal(false);

  loadError = false;
  errorImageUrl = '';  

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  promotions = signal<any[]>([]);
  
  ngOnInit() {
    this.errorImageUrl = this.errorImage.getErrorImage();
    this.isFetching.set(true);
    this.promotionsService.loadPromotions().subscribe({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      next: (response: any) => {
        this.promotions.set(response.data);
        console.log(response.data);
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

  showPromotionProducts(promotionId: string) {
    this.router.navigate([`/promotion/${promotionId}`]);
    }
}
export { PromotionsService };

