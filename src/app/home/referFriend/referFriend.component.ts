import { Component, OnInit } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { CartService } from '../cart.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-referFriend',
  templateUrl: './referFriend.component.html',
  styleUrls: ['./referFriend.component.css']
})
export class ReferFriendComponent implements OnInit {
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
