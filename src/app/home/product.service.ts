import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Subject } from 'rxjs/internal/Subject';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public searchItems = new Subject<string>();
  categories = [
    {
      thumbImage: 'assets/images/slideimg1.jpg',
      title: 'Vegetarian',
      alt: 'Image alt',
      routeTo: 'vegetarian',
    },
    {
      thumbImage: 'assets/images/slideimg2.jpg',
      title: 'Non-vegetarian',
      alt: 'alt of image',
      routeTo: 'Non-vegetarian',
    },
    {
      thumbImage: 'assets/images/slideimg3.jpg',
      title: 'PoduluPowders',
      alt: 'Image alt',
      routeTo: 'PoduluPowders',
    },
    {
      thumbImage: 'assets/images/slideimg4.jpg',
      alt: 'alt of image',
      routeTo: "HomeMadeMasalas",
      title: "HomeMade Masala's",
    },
    {
      thumbImage: 'assets/images/slideimg5.jpg',
      title: 'Tradaitonal Sweets',
      alt: 'Image alt',
      routeTo: 'TradaitonalSweets',
    },
    {
      thumbImage: 'assets/images/slideimg6.jpg',
      alt: 'alt of image',
      routeTo: 'TradaitonalHot',
      title: 'Tradaitonal Hot',
    },
    {
      thumbImage: 'assets/images/slideimg1.jpg',
      title: 'Non-vegetarian Combo',
      alt: 'Image alt',
      routeTo: 'Non-vegetarianCombo',
    },
    {
      thumbImage: 'assets/images/slideimg2.jpg',
      alt: 'alt of image',
      title: 'Vegetarian Combo',
      routeTo: 'VegetarianCombo',
    },
    {
      thumbImage: 'assets/images/slideimg3.jpg',
      title: 'Hot Combo',
      alt: 'Image alt',
      routeTo: 'HotCombo',
    },
    {
      thumbImage: 'assets/images/slideimg4.jpg',
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
  cancelOrder(id){
  const ownerEmail= this.myauthService.getemail()
    return this.http.post('http://localhost:8000/api/orders/cancelOrder/',
    {
     id:id,
     ownerEmail:ownerEmail
    },
    this.httpHeaders);

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
