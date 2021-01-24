import { AuthService } from './../auth.service';
import { CartService } from './../home/cart.service'
import { Component, OnInit } from '@angular/core';
import { ProductService } from './../home/product.service';
import { CustomizeComponent } from '../../app/home/customize/customize.component';

import { MatDialog } from '@angular/material/dialog';
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


constructor(public dialog: MatDialog,public cartService:CartService, public productService:ProductService,public authService:AuthService) { }

  ngOnInit() {


  }
get getCartItems(){
 this.cartItems = this.cartService.getProducts()

 console.log(this.cartItems)

 return this.cartItems
}

onCustomiseModal(item): void {
  const dialogRef = this.dialog.open(CustomizeComponent, {
    maxWidth: '100% !important',
    height: '100vh',
    data: {item: item}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');

  });
}

get getTotal() {
  this.total =  this.cartService.getTotalPrice();

  this.totalafterBonus = this.total-this.detection
  return this.totalafterBonus.toFixed(0);
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
removeProduct(product){
  this.cartService.removeProduct(product)
}
discardProduct(product){
  this.cartService.discardProduct(product)

}
addProduct(item) {
  this.cartService.addProduct(item);
}
}
