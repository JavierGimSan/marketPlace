import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectCartItems } from '../../state/selectors/cart.selectors';
import { CartItem } from '../../shared/interfaces/cartItem.interface';
// import { deleteFromCartSuccess } from '../../state/actions/cart.actions';


@Component({
  selector: 'app-shopping-cart',
  imports: [RouterModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss'
})
export class ShoppingCartComponent implements OnInit{
    cartItems: CartItem[] = []

    constructor(private store: Store){}

    ngOnInit() {
        this.store.select(selectCartItems).subscribe(cartItems => {
            this.cartItems = cartItems;
            console.log(this.cartItems);
        });
    }

    // deleteProduct(name: string) {
    //     this.store.dispatch(deleteFromCartSuccess({name}));
    // }
}