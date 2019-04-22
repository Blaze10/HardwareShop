import { CartItem } from './../_models/order.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: CartItem[] = [];

  getCart() {
    return this.cart;
  }

  addToCart(item: CartItem) {
    this.cart.push(item);
  }

  getCartCount() {
    return this.cart.length;
  }

  getCartTotalPrice() {
    let total = 0;
    this.cart.forEach(element => {
      total = total + (+element.total);
    });
    return +total;
  }

  removeFromCart(index) {
    this.cart.splice(index, 1);
  }

  clearCart() {
    this.cart = [];
  }

}
