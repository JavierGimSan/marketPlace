import { Component, computed, inject } from '@angular/core';
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
  cartState = computed(() => this.shoppingCartService.getTotalCartItems()); //Cuando el estado del carrito cambia, se actualiza la cantidad de productos

  // cartState = this.shoppingCartService.getTotalCartItems(); 

  cambiarEstadoMenu() {
    this.dropdownEsVisible = !this.dropdownEsVisible;
    console.log(this.dropdownEsVisible);
  }
}