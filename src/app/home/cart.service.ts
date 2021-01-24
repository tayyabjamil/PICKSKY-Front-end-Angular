import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(public http: HttpClient, private myauthService: AuthService) {
    this.getProducts();
  }

  cart = [];
  total = 0;
  httpHeaders = {
    headers: new HttpHeaders({
      'Content-Type': 'Application/Json',
      accept: ' application/json'
    })
  };

  emptyProduct() {
    this.cart = [];
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }
discardProduct(product){
    this.cart.find((item) => {
      if (item._id === product._id) {
          this.cart.splice(item,1)
          item.productCount = 0;
      }
    })
}
  removeProduct(product) {
    let proudctRemoved = false
    this.cart.find((item) => {
      if (item._id === product._id && proudctRemoved == false) {
        if (item.productCount === 1) {
          this.cart.splice(item._id, 1)
          item.productCount = item.productCount - 1;
          return true;
        }
        else {
          item.productCount = item.productCount - 1;
          item.unitTotal = item.unitTotal - item.price
          return true;
        }

      }
    })
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  addProduct(product) {
    let productInCart;
    productInCart = this.cart.find((item) => {
      if (item._id === product._id) {
        return true;
      }
    });

    if (!productInCart) {
      this.cart.push(product);
      product.productCount++
    } else {
      this.cart.forEach((item) => {
        if (item._id == product._id) {
          item.productCount = item.productCount + 1;
          item.unitTotal = item.unitTotal + item.price
        }
      });
    }
    console.log(this.cart)
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  getProducts() {
    if (JSON.parse(localStorage.getItem('cart'))) {
      this.cart = JSON.parse(localStorage.getItem('cart'));
    }
    return this.cart;
  }

  getTotalPrice() {
    let subtotal = 0;
    this.cart.forEach(item => {
      subtotal = item.productCount * item.price + subtotal;
    });
    return subtotal;
  }

  order(orderData) {
    const username = this.myauthService.getusername()
    const user = this.myauthService.getID()
    return this.http.post(
      'http://localhost:8000/api/orders/',
      {
        cartData: orderData.cartItems,
        total: orderData.total,
        user: user,
        username: username,
        refrence: orderData.refrence,
        phase: orderData.phase,
        ownerEmail: orderData.ownerEmail,
        firstName: orderData.firstName,
        lastName: orderData.lastName,
        city: orderData.city,
        adress: orderData.adress,
        code: orderData.code,
        contry: orderData.contry,
        method: orderData.method,

      },
      this.httpHeaders
    );
  }

  getOrderStatus() {
    return of([
      {
        "name": "Pinpont Pen", "photo": "assets/img/products/pinpoint-ballpen.jpg", "quantity": 2, "date": "02-02-2020", "price": 100, "status": "packed"
      }, {
        "name": "Classmate Book", "photo": "assets/img/products/classmate-classmate-notebook-cmn018-original-imae6ajy4qhfxd3k.jpeg", "quantity": 2, "date": "02-02-2020", "price": 100, "status": "shipped"
      },
      {
        "name": "Classmate Book", "photo": "assets/img/products/classmate-classmate-notebook-cmn018-original-imae6ajy4qhfxd3k.jpeg", "quantity": 2, "date": "02-02-2020", "price": 100, "status": "processing"
      },
      {
        "name": "Classmate Book", "photo": "assets/img/products/classmate-classmate-notebook-cmn018-original-imae6ajy4qhfxd3k.jpeg", "quantity": 2, "date": "02-02-2020", "price": 100, "status": "delivered"
      }]);
  }
}
