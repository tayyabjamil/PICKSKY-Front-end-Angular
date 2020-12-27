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
      'https://calm-lake-26690.herokuapp.com/api/products/', fd
    );
  }
  shippingPhase(shippingPhase) {
    return this.http.post(
      'https://calm-lake-26690.herokuapp.com/api/orders/shipping',
      {
        phase: this.phase = "shipping",
        ownerEmail: shippingPhase.ownerEmail,
        orderId: shippingPhase.orderId
      },
      this.httpHeaders
    );
  }
  getAllOrders() {
    return this.http.get('https://calm-lake-26690.herokuapp.com/api/orders/', this.httpHeaders);
  }
  getPhase() {

    return this.phase
  }

  // getlocations(latitude: number, longitude: number ){
  //   return this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyAYJvPnMzFkvkeka7kw_aV4Pjn3TeeACv8`);  
  // }


  getlocation(latitude: number, longitude: number) {
    return this.http.post(
      'https://calm-lake-26690.herokuapp.com/api/location',
      {

        latitude: latitude,
        longitude: longitude
      },
      this.httpHeaders
    );
  }
}

