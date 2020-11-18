import { AuthService } from './../../auth.service';
import { CartService } from './../cart.service';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
cartItems = [];
total = 0;
totalafterBonus=0;
detection=0
refrence:string;
constructor(public cartService:CartService, public productService:ProductService,public authService:AuthService) { }

  ngOnInit() {
  this.getCartItems()
  }
getCartItems(){
 this.cartItems = this.cartService.getProducts()
 console.log(this.cartItems)
}

get getTotal() {
  this.total =  this.cartService.getTotalPrice();

  this.totalafterBonus = this.total-this.detection
  return this.totalafterBonus.toFixed(2);
}
   order(){
    this.authService.getemail()
    const orderData = {
      cartItems : this.cartItems,
      total : this.total,
      refrence: this.refrence,
      phase:"delievry phase",
      ownerEmail: this.authService.getemail()
     }
    this.cartService.order(orderData).subscribe((data: any) => {
      alert("Order Sent")

   })
}
getImage(imageId) {
  if (!imageId) return '';
  return this.productService.productImageUrl(imageId);
}
 getBonus(){

   this.detection = (10 / 100) * this.total

   console.log(this.totalafterBonus)
   return this.totalafterBonus
}
}
