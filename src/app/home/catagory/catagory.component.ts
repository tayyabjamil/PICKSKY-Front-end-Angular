import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { CartService } from '../cart.service';
import { ProductService } from '../product.service';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-catagory',
  templateUrl: './catagory.component.html',
  styleUrls: ['./catagory.component.css']
})
export class CatagoryComponent implements OnInit {

  page;
  catagoryItems = []
  mediaSub: Subscription
  deviceXs: boolean;
  deviceLg: boolean;
  deviceMd: boolean;
  deviceSm: boolean;
  currentCategory;
  cartItems=[]
  constructor(
    public route: ActivatedRoute,
    public mediaObserver: MediaObserver, public productService: ProductService,
    public cartService: CartService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.mediaSub = this.mediaObserver.media$.subscribe((result: MediaChange) => {
      console.log(result.mqAlias)
      this.deviceXs = result.mqAlias === 'xs'
      this.deviceSm = result.mqAlias === 'sm'
      this.deviceLg = result.mqAlias === 'lg'
      this.deviceMd = result.mqAlias === 'md'
    })
    window.scrollTo(350, 350);
    this._route.paramMap.subscribe((params: any) => {
      if (params && params.params.page) {
        let categoryRoute  =  params.params.page;
        this.currentCategory = this.productService.categories.find((item) => {
          if (item.routeTo === categoryRoute) {
            return true;
          }
        });
      }
      if (this.currentCategory && this.currentCategory.routeTo) {
        this.catagoryItems = []
        this.CatagoryProducts(this.currentCategory.routeTo)

      }

    });
  }

   getCartItems() {
    this.cartItems = this.cartService.getProducts()
}
  CatagoryProducts(page) {
  this.getCartItems()
    this.productService.getProducts().subscribe((products: any) => {
      let pageMatch = products.filter((productPage) => productPage.catagory === page)
      // this.catagoryItems = products
        pageMatch.forEach(catagoryProduct => {
        catagoryProduct.fil
        this.cartItems.forEach(cartProduct => {
          if (catagoryProduct._id == cartProduct._id) {
            catagoryProduct.productCount = cartProduct.productCount
          }
        });
        this.catagoryItems.push(catagoryProduct)

      });

    }, (error) => {
      console.log('error in getting all products');
    });
  }
get getcatagoryProducts(){
  return this.catagoryItems
}
  addProduct(item) {
    this.cartService.addProduct(item);
  }

}
