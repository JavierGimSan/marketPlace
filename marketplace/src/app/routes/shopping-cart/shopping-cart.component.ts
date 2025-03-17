import { Component, inject } from '@angular/core';
import { ShoppingCartService } from '../../shared/services/shopping-cart.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  imports: [RouterModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss'
})
export class ShoppingCartComponent {
  shoppingCartService = inject(ShoppingCartService);

  cartState = this.shoppingCartService.state().cartItems;

  printState(){
    console.log(this.cartState);
  }
}
