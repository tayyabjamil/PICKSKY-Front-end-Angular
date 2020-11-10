import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {}
  cart = [];
  total=0;
  addProduct(product) {

    let productInCart;
    productInCart = this.cart.find((item) => {
      if (item.productId === product.productId) {
        return true;
      }
    });

    if (!productInCart) {
      this.cart.push(product);
    } else {
      this.cart.forEach((item) => {
        if (item.productId == product.productId) {
          item.productCount = item.productCount + 1;
          item.unitTotal = item.unitTotal + item.price
        }
      });
    }
console.log(this.cart)
}

  getProducts() {
    return this.cart;
  }

  getTotalPrice(){
    let subtotal = 0;
    this.cart.forEach(item => {

      subtotal = item.productCount * item.price + subtotal;
    });
    return subtotal;
  }
}
