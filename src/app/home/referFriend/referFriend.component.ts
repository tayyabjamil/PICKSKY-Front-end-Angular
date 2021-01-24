import { Component, OnInit } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
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
  myRefrenceCode;
  constructor(public mediaObserver:MediaObserver,
    public productService:ProductService,
    public cartService:CartService,
    public authService:AuthService) { }
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
  this.myRefrenceCode = this.authService.getRefrenceId()
  }

  refer(){
    const data ={
      refrenceCode:this.refrenceCode,
      friendEmail:this.friendEmail
    }
    this.productService.referFriend(data).subscribe((products:any) => {
    alert("Mail sent to your friend");
    }, (error) => {
   alert("use correct refrenceId")
    });

  }
}
