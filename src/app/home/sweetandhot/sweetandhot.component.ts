import { Component, OnInit } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { CartService } from '../cart.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-sweetandhot',
  templateUrl: './sweetandhot.component.html',
  styleUrls: ['./sweetandhot.component.scss']
})
export class SweetandHotComponent implements OnInit {
  products = []
  constructor(public mediaObserver: MediaObserver, public productService: ProductService,
    public cartService: CartService) { }
  mediaSub: Subscription
  deviceXs: boolean;
  deviceLg: boolean;
  deviceMd: boolean;
  deviceSm: boolean;
  sweetandhotProducts;
  ngOnInit() {
    this.mediaSub = this.mediaObserver.media$.subscribe((result: MediaChange) => {
      console.log(result.mqAlias)
      this.deviceXs = result.mqAlias === 'xs'
      this.deviceSm = result.mqAlias === 'sm'
      this.deviceLg = result.mqAlias === 'lg'
      this.deviceMd = result.mqAlias === 'md'

    })

    this.getCatagoryProducts()
  }
  getCatagoryProducts() {
    this.productService.getCatagoryProducts('fish&meat').subscribe((products) => {
      this.sweetandhotProducts = products;
    }, (error) => {
      console.log('error in getting all products');
    });
  }
  addProduct(item) {
    this.cartService.addProduct(item);
  }

}