import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProfileMenuComponent } from '../profile-menu/profile-menu.component';
import { ShoppingCartService } from '../../shared/services/shopping-cart.service';

@Component({
  selector: 'app-header',
  imports: [RouterModule, ProfileMenuComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  dropdownEsVisible = false;
  shoppingCartService = inject(ShoppingCartService);

  cartState = this.shoppingCartService.cartState;

  cambiarEstadoMenu() {
    this.dropdownEsVisible = !this.dropdownEsVisible;
    console.log(this.dropdownEsVisible);
  }

}