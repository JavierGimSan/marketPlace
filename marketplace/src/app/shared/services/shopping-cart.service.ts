import { Injectable } from "@angular/core";
import { SignalsSimpleStoreService } from "./signalsSimpleStore.service";
import { CartState } from "../interfaces/cartState.interface";
import { CartItem } from "../interfaces/cartItem.interface";

@Injectable()
export class ShoppingCartService extends SignalsSimpleStoreService<CartState>{
  constructor(){
    super();
    this.setState({cartItems: []});
  }

  addCartItem(cartItem: CartItem){
    const currentCartItems = this.state().cartItems;
    const cartItemIndex = currentCartItems.findIndex(b => b.name === cartItem.name);
    if (cartItemIndex > -1){
      currentCartItems[cartItemIndex].quantity += cartItem.quantity;
    } else {
      currentCartItems.push(cartItem);
    }
    this.setState({cartItems: currentCartItems});
  }

  getTotalCartItems() {
    this.state().cartItems.reduce((total, cartItem) => total += cartItem.quantity, 0);
  }



}

// @Injectable({
//   providedIn: 'root',
// })

// export class ShoppingCartService {
//  private _itemsCount = signal(0);
//  private _cartState = signal(0);

//   incrementItems(){
//     this._itemsCount.set(this._itemsCount() + 1);
//   }

//   decrementItems(){
//     if(this._itemsCount() > 0){
//       this._itemsCount.set(this._itemsCount() - 1);
//     }
//   }

//   get itemsCount(){
//     return this._itemsCount();
//   }

//   setCartState(){
//     this._cartState.set(this._cartState() + this._itemsCount());
//   }

//   setCountToZero(){
//     this._itemsCount.set(0);
//   }

//   get cartState(){
//     return this._cartState;
//   }
// }
