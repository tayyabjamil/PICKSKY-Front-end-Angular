import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(public http: HttpClient, private myauthService: AuthService) { }
  phase = "delivery phase"
  httpHeaders = {
    headers: new HttpHeaders({
      'Content-Type': 'Application/Json',
      accept: ' application/json'
    })
  };

  getProducts() {
    return this.http.get('https://calm-lake-26690.herokuapp.com/api/products', this.httpHeaders);
  }
  getOrders() {
    return this.http.get('https://calm-lake-26690.herokuapp.com/api/orders/' + this.myauthService.getID(), this.httpHeaders);
  }

  featuredProducts() {
    return this.http.get('https://calm-lake-26690.herokuapp.com/api/products/featuredProducts', this.httpHeaders);
  }

  getCatagoryProducts(catagory) {
    return this.http.get('https://calm-lake-26690.herokuapp.com/api/products/catagory/' + catagory, this.httpHeaders);
  }
  productImageUrl(name) {
    return 'https://calm-lake-26690.herokuapp.com/api/products/image/' + name;
  }
  referFriend(data) {
    return this.http.post(
      'https://calm-lake-26690.herokuapp.com/api/users/referFriend',
      {
        userId: this.myauthService.getID(),
        refrenceCode: data.refrenceCode,
        friendEmail: data.friendEmail
      },
      this.httpHeaders
    );
  }
  // supportPage(data){
  //   return 'https://calm-lake-26690.herokuapp.com/api/products/image/' + data;
  // }
}
