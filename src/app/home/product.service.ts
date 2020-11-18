import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { AuthService } from '../auth.service';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(public http: HttpClient,private myauthService: AuthService) { }
  phase = "delivery phase"
  httpHeaders = {
    headers: new HttpHeaders({
      'Content-Type': 'Application/Json',
      accept: ' application/json'
    })
  };

  getProducts() {
    return this.http.get('http://localhost:8000/api/products' , this.httpHeaders);
  }
  getOrders() {
    return this.http.get('http://localhost:8000/api/orders/' + this.myauthService.getID(), this.httpHeaders);
  }

  featuredProducts() {
    return this.http.get('http://localhost:8000/api/products/featuredProducts' , this.httpHeaders);
  }

  getCatagoryProducts(catagory) {
    return this.http.get('http://localhost:8000/api/products/' + catagory, this.httpHeaders);
  }
  productImageUrl(name) {
    return 'http://localhost:8000/api/products/image/' + name;
  }


}
