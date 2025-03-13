import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { HeaderComponent } from "./header/header.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { RouterOutlet } from '@angular/router';
import { ShoppingCartService } from '../shared/services/shopping-cart.service';

@Component({
  selector: 'app-theme-base',
  imports: [HeaderComponent, SidebarComponent, RouterOutlet],
  template: `
    <app-header></app-header>
    <app-sidebar></app-sidebar>
    <div class="content">
      <router-outlet></router-outlet>
    </div>
    `,
  styleUrl: './theme-base.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeBaseComponent {
  shoppingCartService = inject(ShoppingCartService)
 }
