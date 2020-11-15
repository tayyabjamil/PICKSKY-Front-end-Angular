import { Injectable } from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import { AuthService } from '../auth.service';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(public http: HttpClient,private myauthService: AuthService) {}
  cart = [];
  total=0;
  httpHeaders = {
    headers: new HttpHeaders({
      'Content-Type': 'Application/Json',
      accept: ' application/json'
    })
  };
  addProduct(product) {

    let productInCart;
    productInCart = this.cart.find((item) => {
      if (item._id === product._id) {
        return true;
      }
    });

    if (!productInCart) {
      this.cart.push(product);
    } else {
      this.cart.forEach((item) => {
        if (item._id == product._id) {
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
  order(orderData){
  const username =this.myauthService.getusername()
  const user = this.myauthService.getID()
    return this.http.post(
      'http://localhost:8000/api/orders/',
    {
      cartData: orderData.cartItems,
      total: orderData.total,
      user:user,
      username:username

    },
    this.httpHeaders
      );
     }
}
