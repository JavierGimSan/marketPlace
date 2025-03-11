import { signal } from '@angular/core';

export class ShoppingCartService {
 private _itemsCount = signal(0);
 private _cartState = signal(0);

  incrementItems(){
    this._itemsCount.set(this._itemsCount() + 1);
  }

  decrementItems(){
    if(this._itemsCount() > 0){
      this._itemsCount.set(this._itemsCount() - 1);
    }
  }

  getItemsCount(){
    return this._itemsCount();
  }

  setCartState(){
    this._cartState.set(this._cartState() + this._itemsCount());
  }

  getCartState(){
    return this._cartState();
  }
}
