import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private allAdminOrdersSavedResponse;
  httpHeaders = {
    headers: new HttpHeaders({
      'Content-Type': 'Application/Json',
      accept: ' application/json'
    })
  };

  phase = "delivery phase"
  constructor(private http: HttpClient, public authService: AuthService) { }

  addProducts(fd) {
    return this.http.post(
      `${environment.apiURL}${environment.SHRIVASA_FOODS_PRODUCTS_API}`, fd
    );
  }
  shippingPhase(shippingPhase) {
    return this.http.post(
      `${environment.apiURL}${environment.SHRIVASA_FOODS_ORDERS_API}` + '/shipping',
      {
        phase: shippingPhase.phase,
        ownerEmail: shippingPhase.ownerEmail,
        orderId: shippingPhase.orderId
      },
      this.httpHeaders
    );
  }
  getAllOrders(): Observable<any> {
    //This service even after this update returns observable in both cases (http or cache).
    return new Observable((observer) => {
      if (this.allAdminOrdersSavedResponse) {
        observer.next(this.allAdminOrdersSavedResponse);
        observer.complete();
      } else { /* make http request & process */
        this.http.get(`${environment.apiURL}${environment.SHRIVASA_FOODS_ORDERS_API}`, this.httpHeaders).subscribe(data => {
          this.allAdminOrdersSavedResponse = data;
          observer.next(this.allAdminOrdersSavedResponse);
          observer.complete();
        }); /* make sure to handle http error */

      }
    });

  }
  updateBonus() {
    return this.http.post(`${environment.apiURL}${environment.SHRIVASA_FOODS_USER_API}` + '/updateBonus/' + this.authService.getID(), this.httpHeaders);

  }
  giveBonus() {
    return this.http.post(`${environment.apiURL}${environment.SHRIVASA_FOODS_USER_API}` + '/updateBonus/' + this.authService.getID(), this.httpHeaders);

  }
  getPhase() {

    return this.phase
  }

  // getlocations(latitude: number, longitude: number ){
  //   return this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyAYJvPnMzFkvkeka7kw_aV4Pjn3TeeACv8`);
  // }


  getlocation(latitude: number, longitude: number) {
    return this.http.post(
      `${environment.apiURL}${environment.SHRIVASA_FOODS_LOCATION_API}`,
      {
        latitude: latitude,
        longitude: longitude
      },
      this.httpHeaders
    );
  }
  edit(data) {
    return this.http.post(
      `${environment.apiURL}${environment.SHRIVASA_FOODS_PRODUCTS_API}` + '/editProduct',
      data
    );

  }
  deleteProduct(id) {
    return this.http.post(`${environment.apiURL}${environment.SHRIVASA_FOODS_PRODUCTS_API}` + '/delete',
      {
        id: id
      },
      this.httpHeaders
    );
  }
}

