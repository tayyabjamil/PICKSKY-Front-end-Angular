import { Component, OnInit } from '@angular/core';

import { CartService } from '../cart.service';
import { ProductService } from '../product.service';
import  {MediaObserver, MediaChange} from '@angular/flex-layout';
import  { Subscription } from 'rxjs';
import { of } from 'rxjs';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.scss']
})
export class MyordersComponent implements OnInit {
  allOrders = [];
  friendEmail;
  public status:any;
  refrenceCode;
  constructor(public mediaObserver:MediaObserver,
    public productService:ProductService,
    public cartService:CartService) { }
    mediaSub:Subscription
    deviceXs:boolean;
    deviceLg:boolean;
    deviceMd:boolean;
    deviceSm:boolean;

  ngOnInit() {
    this.mediaSub = this.mediaObserver.media$.subscribe((result:MediaChange)=>{
      console.log(result.mqAlias)
      this.deviceXs = result.mqAlias === 'xs'
      this.deviceSm = result.mqAlias ==='sm'
      this.deviceLg = result.mqAlias === 'lg'
      this.deviceMd = result.mqAlias === 'md'

    })
    this.loadData()
    this.myOrders()
  }
  getOrderStatus(){
    [
 {
 "name":"Pinpont Pen", "photo":"assets/img/products/pinpoint-ballpen.jpg", "quantity":2,
  "date":"02-02-2020", "price":100, "status":"packed"
 }]

}

  myOrders() {
    this.productService.getOrders().subscribe((products:any) => {
      this.allOrders = products.orders;
    }, (error) => {
      console.log('error in getting all products');
    });
  }
  loadData(){
    this.cartService.getOrderStatus().subscribe((data)=>{
      console.log(data)
      this.status=data
      console.log(this.status)
    })
  }
  orderDetails(item){

  }
  getImage(imageId) {
    if (!imageId) return '';
    return this.productService.productImageUrl(imageId);
  }
orderCompleted(item){

}

}
