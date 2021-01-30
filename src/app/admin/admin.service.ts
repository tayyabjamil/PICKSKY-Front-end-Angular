import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';

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
  constructor(private http: HttpClient,public authService:AuthService) { }

  addProducts(fd) {
    return this.http.post(
      'http://localhost:8000/api/products/', fd
    );
  }
  shippingPhase(shippingPhase) {
    return this.http.post(
      'http://localhost:8000/api/orders/shipping',
    {
        phase: shippingPhase.phase,
        ownerEmail: shippingPhase.ownerEmail,
        orderId: shippingPhase.orderId
      },
      this.httpHeaders
    );
  }
  getAllOrders() {
    return this.http.get('http://localhost:8000/api/orders/', this.httpHeaders);
  }
  updateBonus(){
    return this.http.post('http://localhost:8000/api/users/updateBonus/'+this.authService.getID(), this.httpHeaders);

  }
  giveBonus(){
    return this.http.post('http://localhost:8000/api/users/updateBonus/'+this.authService.getID(), this.httpHeaders);

  }
  getPhase() {

    return this.phase
  }

  // getlocations(latitude: number, longitude: number ){
  //   return this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyAYJvPnMzFkvkeka7kw_aV4Pjn3TeeACv8`);
  // }


  getlocation(latitude: number, longitude: number) {
    return this.http.post(
      'http://localhost:8000/api/location',
      {

        latitude: latitude,
        longitude: longitude
      },
      this.httpHeaders
    );
  }
  edit(data){
    return this.http.post(
      'http://localhost:8000/api/products/editProduct',
      data
    );

  }
  deleteProduct(id) {
    return this.http.post('http://localhost:8000/api/products/delete',
    {
     id:id
    },
    this.httpHeaders
  );
}
}

