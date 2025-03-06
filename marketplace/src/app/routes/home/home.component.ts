import { Component, inject, OnInit, signal } from '@angular/core';
import { HomeBackgroundService } from '../../shared/services/home-background-image.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  backgroundService = inject(HomeBackgroundService);
  imageUrl = signal("");

  ngOnInit() {
    this.backgroundService.loadBackgroundImage().subscribe({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      next: (response: any) => {
        this.imageUrl.set(response.data.main_image);
      }
    })    
  }
}
