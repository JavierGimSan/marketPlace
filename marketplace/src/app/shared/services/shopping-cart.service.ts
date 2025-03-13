import { Injectable, signal } from "@angular/core";
import { SignalsSimpleStoreService } from "./signalsSimpleStore.service";
import { CartState } from "../interfaces/cartState.interface";
import { CartItem } from "../interfaces/cartItem.interface";

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService extends SignalsSimpleStoreService<CartState> {
  constructor(){
    super();
    this.setState({cartItems: []});
  }
  
  addToCart(item: CartItem){
    const currentCartItems = this.state().cartItems;
    const cartItemIndex = currentCartItems.findIndex(b => b.name === item.name);
    if (cartItemIndex > -1){
      currentCartItems[cartItemIndex].quantity += item.quantity;
    } else {
      currentCartItems.push(item);
    }
    this.setState({cartItems: currentCartItems});
    this.setCountToZero();
  
  }

    setCountToZero(){
    this._itemsCount.set(0);
  }

  logCartItems() {
    console.log('Productos en el carrito:', this.state().cartItems);
  }

  getTotalCartItems() {
    return this.state().cartItems.reduce((total, cartItem) => total += cartItem.quantity, 0);
  }

 private _itemsCount = signal(0);
 //  private _cartState = signal(0);

  incrementItems(){
    this._itemsCount.set(this._itemsCount() + 1);
  }

  decrementItems(){
    if(this._itemsCount() > 0){
      this._itemsCount.set(this._itemsCount() - 1);
    }
  }

  get itemsCount(){
    return this._itemsCount();
  }

}

// @Injectable({
//   providedIn: 'root',
// })

// export class ShoppingCartService {


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
