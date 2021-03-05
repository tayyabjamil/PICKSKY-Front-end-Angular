import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Subject } from 'rxjs/internal/Subject';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private featuredProductsSavedResponse;
  private allProductsSavedResponse;
  private allOrdersSavedResponse;
 private trendingProductsSavedResponse
  public searchItems = new Subject<string>();
  categories = [
    {
      thumbImage: 'assets/images/Vegpickle.jpg',
      title: 'Vegetarian',
      alt: 'Image alt',
      routeTo: 'vegetarian',
    },
    {
      thumbImage: 'assets/images/Muttonpickel.jpg',
      title: 'Non-vegetarian',
      alt: 'alt of image',
      routeTo: 'Non-vegetarian',
    },
    {
      thumbImage: 'assets/images/podi.jpg',
      title: 'PoduluPowders',
      alt: 'Image alt',
      routeTo: 'PoduluPowders',
    },
    {
      thumbImage: 'assets/images/masala.jpg',
      alt: 'alt of image',
      routeTo: "HomeMadeMasalas",
      title: "HomeMade Masala's",
    },
    {
      thumbImage: 'assets/images/sweets.jpg',
      title: 'Tradaitonal Sweets',
      alt: 'Image alt',
      routeTo: 'TradaitonalSweets',
    },
    {
      thumbImage: 'assets/images/Indianhot.jpg',
      alt: 'alt of image',
      routeTo: 'TradaitonalHot',
      title: 'Tradaitonal Hot',
    },
    {
      thumbImage: 'assets/images/Muttonpickel.jpg',
      title: 'Non-vegetarian Combo',
      alt: 'Image alt',
      routeTo: 'Non-vegetarianCombo',
    },
    {
      thumbImage: 'assets/images/Vegpickle.jpg',
      alt: 'alt of image',
      title: 'Vegetarian Combo',
      routeTo: 'VegetarianCombo',
    },
    {
      thumbImage: 'assets/images/podi.jpg',
      title: 'Hot Combo',
      alt: 'Image alt',
      routeTo: 'HotCombo',
    },
    {
      thumbImage: 'assets/images/masala.jpg',
      alt: 'alt of image',
      routeTo: 'SweetsCombo',
      title: 'Sweets Combo',
    },
  ];

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

  getProducts(): Observable<any> {
    //This service even after this update returns observable in both cases (http or cache).
    return new Observable((observer) => {
      if (this.allProductsSavedResponse) {
        observer.next(this.allProductsSavedResponse);
        observer.complete();
      } else { /* make http request & process */
        this.http.get(`${environment.apiURL}${environment.SHRIVASA_FOODS_PRODUCTS_API}`, this.httpHeaders).subscribe(data => {
          this.allProductsSavedResponse = data;
          observer.next(this.allProductsSavedResponse);
          observer.complete();
        }); /* make sure to handle http error */

      }
    });

  }

  getOrders(): Observable<any>  {

    return this.http.get(`${environment.apiURL}${environment.SHRIVASA_FOODS_ORDERS_API}` + '/' +this.myauthService.getID(), this.httpHeaders)

  }
  gettrendingProducts(): Observable<any> {
    return new Observable((observer) => {
      if (this.trendingProductsSavedResponse) {
        observer.next(this.trendingProductsSavedResponse);
        observer.complete();
      } else { /* make http request & process */
        this.http.get(`${environment.apiURL}${environment.SHRIVASA_FOODS_PRODUCTS_API}` + '/trendingProducts', this.httpHeaders).subscribe(data => {
          this.trendingProductsSavedResponse = data;
          observer.next(this.trendingProductsSavedResponse);
          observer.complete();
        }); /* make sure to handle http error */
      }

    });
  }
featuredProducts(): Observable<any> {
    return new Observable((observer) => {
      if (this.featuredProductsSavedResponse) {
        observer.next(this.featuredProductsSavedResponse);
        observer.complete();
      } else { /* make http request & process */
        this.http.get(`${environment.apiURL}${environment.SHRIVASA_FOODS_PRODUCTS_API}` + '/featuredProducts', this.httpHeaders).subscribe(data => {
          this.featuredProductsSavedResponse = data;
          observer.next(this.featuredProductsSavedResponse);
          observer.complete();
        }); /* make sure to handle http error */
      }

    });
  }

  getCatagoryProducts(catagory) {
    return this.http.get(`${environment.apiURL}${environment.SHRIVASA_FOODS_PRODUCTS_API}` + '/catagory/' + catagory, this.httpHeaders);
  }

  productImageUrl(name) {
    return `${environment.apiURL}${environment.SHRIVASA_FOODS_PRODUCTS_API}` + '/image/' + name;
  }

  getOrsers(id) {
    //  return this.http.get(`${environment.apiURL}${environment.SHRIVASA_FOODS_ORDERS_API}` + id, this.httpHeaders);
  }
  cancelOrder(id) {
    const ownerEmail = this.myauthService.getemail()
    return this.http.post(`${environment.apiURL}${environment.SHRIVASA_FOODS_ORDERS_API}` + '/cancelOrder/',
      {
        id: id,
        ownerEmail: ownerEmail
      },
      this.httpHeaders);

  }
  payment(data) {
    const userId = this.myauthService.getID()
    return this.http.post(
      'http://localhost:8000/api/payment/',
      {
        cardNo: data.cardNo,
        name: data.name,
        expirationDate: data.expirationDate,
        sequrityCode: data.sequrityCode,
        userId
      },
      this.httpHeaders
    );
  }
  getAllPayments() {
    const userId = this.myauthService.getID()
    return this.http.get('http://localhost:8000/api/payment/' + userId, this.httpHeaders);
  }
  referFriend(data) {
    return this.http.post(
      `${environment.apiURL}${environment.SHRIVASA_FOODS_USER_API}` + '/referFriend',
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
