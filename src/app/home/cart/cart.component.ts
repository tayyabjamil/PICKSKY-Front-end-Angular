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
constructor(public cartService:CartService, public productService:ProductService,) { }

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
   order(){
     const orderData = {
      cartItems : this.cartItems,
      total : this.total
     }
    this.cartService.order(orderData).subscribe((data: any) => {
      alert("Product Added")

   })
}
getImage(imageId) {
  if (!imageId) return '';
  return this.productService.productImageUrl(imageId);
}
}
