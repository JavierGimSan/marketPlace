import { Component, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProfileMenuComponent } from '../profile-menu/profile-menu.component';
import { ShoppingCartService } from '../../shared/services/shopping-cart.service';

@Component({
  selector: 'app-header',
  imports: [RouterModule, ProfileMenuComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  providers: [ShoppingCartService],
})
export class HeaderComponent {
  dropdownEsVisible = false;
  shoppingCartService = inject(ShoppingCartService);

  cartStateSignal = signal(this.cartState());

  cambiarEstadoMenu() {
    this.dropdownEsVisible = !this.dropdownEsVisible;
    console.log(this.dropdownEsVisible);
  }

  cartState(){
    return this.shoppingCartService.getCartState();
  }
}