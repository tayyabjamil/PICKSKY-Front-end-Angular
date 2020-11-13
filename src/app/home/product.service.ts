import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) { }

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
    return this.http.get('http://localhost:8000/api/products/' + catagory, this.httpHeaders);
  }

}
