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
      title: 'Bakery & Pastry',
      alt: 'Image alt',
      routeTo: 'vegitables',
    },
    {
      thumbImage: 'assets/images/slideimg2.jpg',
      title: 'Pickles',
      alt: 'alt of image',
      routeTo: 'pickles',
    },
    {
      thumbImage: 'assets/images/slideimg3.jpg',
      title: 'Image title',
      alt: 'Image alt',
      routeTo: 'slideimg3',
    },
    {
      thumbImage: 'assets/images/slideimg4.jpg',
      alt: 'alt of image',
      routeTo: 'fish',
      title: 'Fish & Meat',
    },
    {
      thumbImage: 'assets/images/slideimg5.jpg',
      title: 'TraditionalPowders',
      alt: 'Image alt',
      routeTo: 'traditional_powders',
    },
    {
      thumbImage: 'assets/images/slideimg6.jpg',
      alt: 'alt of image',
      routeTo: 'snakes',
      title: 'Snakes & Beverages',
    },
    {
      thumbImage: 'assets/images/slideimg1.jpg',
      title: 'Bakery & Pastry',
      alt: 'Image alt',
      routeTo: 'bakery',
    },
    {
      thumbImage: 'assets/images/slideimg2.jpg',
      alt: 'alt of image',
      title: 'Pickles',
      routeTo: 'pickles',
    },
    {
      thumbImage: 'assets/images/slideimg3.jpg',
      title: 'Image title',
      alt: 'Image alt',
      routeTo: 'slideimg3',
    },
    {
      thumbImage: 'assets/images/slideimg4.jpg',
      alt: 'alt of image',
      routeTo: 'Fish',
      title: 'Fish & Meat',
    },
    {
      thumbImage: 'assets/images/slideimg5.jpg',
      title: 'TraditionalPowders',
      alt: 'Image alt',
      routeTo: 'slideimg5',
    },
    {
      thumbImage: 'assets/images/slideimg6.jpg',
      alt: 'alt of image',
      routeTo: 'Snakes',
      title: 'Snakes & Beverages',
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
