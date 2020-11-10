import { CartService } from './../cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
cartItems = [];
total = 0;
constructor(public cartService:CartService) { }

  ngOnInit() {
  this.getCartItems()
  }
getCartItems(){
 this.cartItems = this.cartService.getProducts()
console.log(this.cartItems)
}

get getTotal() {
  this.total =  this.cartService.getTotalPrice();
  return this.total;
   }
}
