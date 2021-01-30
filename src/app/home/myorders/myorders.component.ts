import { Component, OnInit } from '@angular/core';

import { CartService } from '../cart.service';
import { ProductService } from '../product.service';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { of } from 'rxjs';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.css']
})
export class MyordersComponent implements OnInit {
  allOrders = [];
  canceledOrders = [];
  friendEmail;
  public status: any;
  refrenceCode;
  selectedIndex = null;

  constructor(public mediaObserver: MediaObserver,
    public productService: ProductService,
    public cartService: CartService) { }
  mediaSub: Subscription
  deviceXs: boolean;
  deviceLg: boolean;
  deviceMd: boolean;
  deviceSm: boolean;

  ngOnInit() {
    this.mediaSub = this.mediaObserver.media$.subscribe((result: MediaChange) => {
      console.log(result.mqAlias)
      this.deviceXs = result.mqAlias === 'xs'
      this.deviceSm = result.mqAlias === 'sm'
      this.deviceLg = result.mqAlias === 'lg'
      this.deviceMd = result.mqAlias === 'md'

    })
    this.myOrders()
  }


  myOrders() {
    this.productService.getOrders().subscribe((products: any) => {
      this.allOrders = products.orders;
      this.allOrders.forEach(element => {

        if (element.cancelOrder == true) {
          this.canceledOrders.push(element)
        }
      });

    }, (error) => {
      console.log('error in getting all products');
    });
  }
  
  cancelOrders() {}

  orderDetails(item) { }

  getImage(imageId) {
    if (!imageId) return '';
    return this.productService.productImageUrl(imageId);
  }

  orderCancel(id) {
    this.productService.cancelOrder(id).subscribe((products: any) => {
      alert("order canceled")
    }, (error) => {
      alert(error.error.message)
    });
  }


  onSelectedItem(i) {
    if (this.selectedIndex == i) {
      this.selectedIndex = null
    } else {
      this.selectedIndex = i
    }
  }

}
