import { Component, OnInit } from '@angular/core';

import { CartService } from '../cart.service';
import { ProductService } from '../product.service';
import  {MediaObserver, MediaChange} from '@angular/flex-layout';
import  { Subscription } from 'rxjs';
@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.scss']
})
export class MyordersComponent implements OnInit {
  allOrders = [];
  friendEmail;
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

    this.myOrders()
  }
  myOrders() {
    this.productService.getOrders().subscribe((products:any) => {
      this.allOrders = products.orders;
    }, (error) => {
      console.log('error in getting all products');
    });
  }
  orderDetails(item){

  }
  getImage(imageId) {
    if (!imageId) return '';
    return this.productService.productImageUrl(imageId);
  }
orderCompleted(item){

}
refer(){
  const data ={
    refrenceCode:this.refrenceCode,
    friendEmail:this.friendEmail
  }
  this.productService.referFriend(data).subscribe((products:any) => {
  alert("refer");
  }, (error) => {
 alert("use correct refrenceId")
  });

}
}
