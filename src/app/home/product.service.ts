import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // productList: Array<Product> = ([
  //   { productId: 1, productCount: 1, unitTotal: 12000, image: '../assets/images/veg1.jpg', price: 12000, details: 'Twix 30g' },
  //   { productId: 2, productCount: 1, unitTotal: 12000, image: '../assets/images/veg1.jpg', price: 12000, details: 'Twix 30g' },
  //   { productId: 3, productCount: 1, unitTotal: 12000, image: '../assets/images/veg1.jpg', price: 12000, details: 'Twix 30g' },
  //   { productId: 4, productCount: 1, unitTotal: 12000, image: '../assets/images/veg1.jpg', price: 12000, details: 'Twix 30g' },
  //   { productId: 5, productCount: 1, unitTotal: 12000, image: '../assets/images/veg1.jpg', price: 12000, details: 'Twix 30g' },
  //   { productId: 6, productCount: 1, unitTotal: 12000, image: '../assets/images/veg1.jpg', price: 12000, details: 'Twix 30g' },
  //   { productId: 7, productCount: 1, unitTotal: 12000, image: '../assets/images/veg1.jpg', price: 12000, details: 'Twix 30g' },
  //   { productId: 8, productCount: 1, unitTotal: 12000, image: '../assets/images/veg1.jpg', price: 12000, details: 'Twix 30g' },

  // ])
  constructor(private http: HttpClient) { }
  // getProducts() {
  //   return this.productList;
  // }
  httpHeaders = {
    headers: new HttpHeaders({
      'Content-Type': 'Application/Json',
      accept: ' application/json'
    })
  };
  getProducts() {
    return this.http.get('http://localhost:8000/api/products' , this.httpHeaders);
  }

  getCatagoryProducts(catagory) {
    return this.http.get('http://localhost:8000/api/products/:catagory' + catagory, this.httpHeaders);
  }

}
