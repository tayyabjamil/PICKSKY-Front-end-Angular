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
  catagoryProducts
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
        this.CatagoryProducts(this.currentCategory.routeTo)
      }

    });
  }

   getCartItems() {
    this.cartItems = this.cartService.getProducts()
}
  CatagoryProducts(page) {
  this.getCartItems()
    this.productService.getCatagoryProducts(page).subscribe((products:any) => {
    //  this.cartItems.forEach(cartItem => {
    //    if(cartItem._id == products._id){
    //     products.productCount = cartItem.productCount
    //    }
    //  this.catagoryProducts.push(products)
    //   });
      this.catagoryProducts = products;

    }, (error) => {
      console.log('error in getting all products');
    });
  }
get getcatagoryProducts(){
  return this.catagoryProducts
}
  addProduct(item) {
    this.cartService.addProduct(item);
  }

}
