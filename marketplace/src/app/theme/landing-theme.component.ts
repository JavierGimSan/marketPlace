import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { RouterOutlet } from '@angular/router';
// import { ShoppingCartService } from '../shared/services/shopping-cart.service';

@Component({
  selector: 'app-landing-theme',
  imports: [HeaderComponent, RouterOutlet],
  template: `
  <app-header></app-header>
  <router-outlet></router-outlet>
  `,
})
export class LandingThemeComponent {
  // shoppingCartService = inject(ShoppingCartService);
}
