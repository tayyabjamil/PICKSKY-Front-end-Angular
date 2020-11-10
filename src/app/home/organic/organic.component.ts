import { Component, OnInit } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { CartService } from '../cart.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-organic',
  templateUrl: './organic.component.html',
  styleUrls: ['./organic.component.scss'],
})
export class OrganicComponent implements OnInit {
  products = [];
  constructor(
    public mediaObserver: MediaObserver,
    public productService: ProductService,
    public cartService: CartService
  ) {}
  mediaSub: Subscription;
  deviceXs: boolean;
  deviceLg: boolean;
  deviceMd: boolean;
  deviceSm: boolean;

  ngOnInit() {
    this.mediaSub = this.mediaObserver.media$.subscribe(
      (result: MediaChange) => {
        console.log(result.mqAlias);
        this.deviceXs = result.mqAlias === 'xs';
        this.deviceSm = result.mqAlias === 'sm';
        this.deviceLg = result.mqAlias === 'lg';
        this.deviceMd = result.mqAlias === 'md';
      }
    );
    this.getproducts();
  }

  getproducts() {
    this.products = this.productService.getProducts();
  }
  addProduct(item) {
    this.cartService.addProduct(item);
  }
}
