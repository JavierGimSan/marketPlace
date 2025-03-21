import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProfileMenuComponent } from '../profile-menu/profile-menu.component';
import { selectTotalCartItems } from '../../state/selectors/cart.selectors';
import { Store } from '@ngrx/store';
// import { ShoppingCartService } from '../../shared/services/shopping-cart.service';

@Component({
  selector: 'app-header',
  imports: [RouterModule, ProfileMenuComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  dropdownEsVisible = false;

  cartItemsCount = signal(0);

  constructor(private store: Store) {
    this.store
      .select(selectTotalCartItems)
      .subscribe(state => this.cartItemsCount.set(state));
  }

  cambiarEstadoMenu() {
    this.dropdownEsVisible = !this.dropdownEsVisible;
    console.log(this.dropdownEsVisible);
  }
}
