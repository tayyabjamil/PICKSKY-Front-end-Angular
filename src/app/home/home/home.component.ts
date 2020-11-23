import { AuthService } from './../../auth.service';
import { ProductService } from '../product.service';
import { CartService } from '../cart.service';
import { Component, OnInit } from '@angular/core';
import  {MediaObserver, MediaChange} from '@angular/flex-layout';
import  { Subscription } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 cart = [];
total ;
allProducts;
  constructor(public mediaObserver:MediaObserver
    ,public cartService:CartService,  private productService: ProductService,private authService:AuthService,
    private router: Router,
    ) { }
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

 get getCartProducts() {
    this.cart =  this.cartService.getProducts();

    return this.cart;
  }
  get getTotal() {
   this.total =  this.cartService.getTotalPrice();
   return this.total;
    }

    onLogoutClick() {
      this.authService.loggedOutName();
      this.authService.loggedOutEmail;
      this.authService.loggedOutuserId;
      this.authService.loggedOutRefrenceId();
    }
}
