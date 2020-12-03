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
  constructor(
    public route: ActivatedRoute,
    public mediaObserver: MediaObserver, public productService: ProductService,
    public cartService: CartService
  ) { }

  ngOnInit() {
    this.mediaSub = this.mediaObserver.media$.subscribe((result: MediaChange) => {
      console.log(result.mqAlias)
      this.deviceXs = result.mqAlias === 'xs'
      this.deviceSm = result.mqAlias === 'sm'
      this.deviceLg = result.mqAlias === 'lg'
      this.deviceMd = result.mqAlias === 'md'
    })
 this.getCatagoryProducts(this.selectedPage)

  }
  get selectedPage(){
    this.page = this.route.snapshot.paramMap.get('page');

    return  this.page
  }
  getCatagoryProducts(page) {
    this.productService.getCatagoryProducts(page).subscribe((products) => {
      this.catagoryProducts = products;
    }, (error) => {
      console.log('error in getting all products');
    });
  }
  addProduct(item) {
    this.cartService.addProduct(item);
  }

}
