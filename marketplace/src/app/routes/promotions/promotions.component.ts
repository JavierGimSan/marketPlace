import { Component, inject, OnInit } from '@angular/core';
import { PromotionsService } from '../../shared/services/promotions.service';

@Component({
  selector: 'app-promotions',
  imports: [],
  templateUrl: './promotions.component.html',
  styleUrl: './promotions.component.scss'
})
export class PromotionsComponent implements OnInit{
  promotionsService = inject(PromotionsService);
  ngOnInit() {
    this.promotionsService.loadPromotions().subscribe({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      next: (response: any) => {
        console.log(response.data);
      },
    })    
  }

}
