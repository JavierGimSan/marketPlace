import { Component, inject, OnInit, signal } from '@angular/core';
import { PromotionsService } from '../../shared/services/promotions.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-promotions',
  imports: [],
  templateUrl: './promotions.component.html',
  styleUrl: './promotions.component.scss'
})
export class PromotionsComponent implements OnInit{

  constructor(private router: Router){}

  promotionsService = inject(PromotionsService);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  promotions = signal<any[]>([]);
  ngOnInit() {
    this.promotionsService.loadPromotions().subscribe({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      next: (response: any) => {
        this.promotions.set(response.data);
        console.log(response.data);
      },
    })    
  }

  showPromotionProducts(promotionId: string) {
    this.router.navigate([`/promotion/${promotionId}`]);
    }
}
export { PromotionsService };

