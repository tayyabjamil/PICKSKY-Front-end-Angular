import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  httpHeaders = {
    headers: new HttpHeaders({
      'Content-Type': 'Application/Json',
      accept: ' application/json'
    })
  };

  phase = "delivery phase"
  constructor(private http: HttpClient) { }

  addProducts(fd) {
    return this.http.post(
      'http://localhost:8000/api/products/', fd
    );
  }
  shippingPhase(shippingPhase) {
    return this.http.post(
      'http://localhost:8000/api/orders/shipping',
      {
        phase: this.phase = "shipping",
        ownerEmail: shippingPhase.ownerEmail,
        orderId: shippingPhase.orderId
      },
      this.httpHeaders
    );
  }
  getAllOrders() {
    return this.http.get('http://localhost:8000/api/orders/', this.httpHeaders);
  }
  getPhase() {

    return this.phase
  }

  getlocation(url:string) {
    return this.http.post(url, this.httpHeaders);  
  }

}

