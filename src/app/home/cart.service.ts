import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(public http: HttpClient, private myauthService: AuthService) {
    this.getProducts();
  }
  allProductsData;
  cart = [];
  allSearchedProducts
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

  discardProduct(product) {
    this.cart.forEach((element,index)=>{
      if(element._id==product._id){
        this.cart.splice(index,1);
        product.productCount=0
        localStorage.setItem('cart', JSON.stringify(this.cart));

      }
   });
   }
  removeProduct(product) {
    let proudctRemoved = false
    this.cart.forEach((item,index)=>{
      if (item._id === product._id && proudctRemoved == false) {
        if (item.productCount === 1) {
          this.cart.splice(index,1);
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
    this.getAllSearchedProducts()
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
    this.getAllSearchedProducts()
  }
  allProducts(products){
    this.allProductsData = products

  }

getAllSearchedProducts(){
  this.allProductsData.forEach(element => {
    element.productCount =0
  });

  let tempProducts: any = this.allProductsData;
  let cartProducts = this.cart
  if (tempProducts && cartProducts) {
    tempProducts.forEach(item => {
      cartProducts.forEach((cartItem) => {
        if (item._id === cartItem._id) {
          item.productCount = cartItem.productCount;
        }
      })
    });
  }
  return this.allSearchedProducts  = this.allProductsData = tempProducts


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
      `${environment.apiURL}${environment.SHRIVASA_FOODS_ORDERS_API}`,
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
        adress1: orderData.adress1,
        adress2: orderData.adress2,
        code: orderData.code,
        appartment: orderData.appartment,

        contry: orderData.contry,
        method: orderData.method,
        cancelOrder: false

      },
      this.httpHeaders
    );
  }


}
