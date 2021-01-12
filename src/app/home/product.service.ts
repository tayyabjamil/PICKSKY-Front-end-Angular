import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Subject } from 'rxjs/internal/Subject';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public searchItems = new Subject<string>();

  constructor(public http: HttpClient, private myauthService: AuthService) { }

  phase = "delivery phase"
  search = false;

  httpHeaders = {
    headers: new HttpHeaders({
      'Content-Type': 'Application/Json',
      accept: ' application/json'
    })
  };

  searchProducts() {
    return !this.search;
  }

  setSearchItems(value: string) {
    this.searchItems.next(value)
  }

  getProducts() {
    return this.http.get('http://localhost:8000/api/products', this.httpHeaders);
  }
  getOrders() {
    return this.http.get('http://localhost:8000/api/orders/' + this.myauthService.getID(), this.httpHeaders);
  }

  featuredProducts() {
    return this.http.get('http://localhost:8000/api/products/featuredProducts', this.httpHeaders);
  }

  getCatagoryProducts(catagory) {
    return this.http.get('http://localhost:8000/api/products/catagory/' + catagory, this.httpHeaders);
  }
  productImageUrl(name) {
    return 'http://localhost:8000/api/products/image/' + name;
  }
  getOrsers(id) {
    return this.http.get('http://localhost:8000/api/orders/' + id, this.httpHeaders);

  }
  referFriend(data) {
    return this.http.post(
      'http://localhost:8000/api/users/referFriend',
      {
        userId: this.myauthService.getID(),
        refrenceCode: data.refrenceCode,
        friendEmail: data.friendEmail
      },
      this.httpHeaders
    );
  }
  // supportPage(data){
  //   return 'http://localhost:8000/api/products/image/' + data;
  // }
}
