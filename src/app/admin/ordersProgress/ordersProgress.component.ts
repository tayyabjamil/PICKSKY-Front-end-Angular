import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/home/product.service';

@Component({
  selector: 'app-ordersProgress',
  templateUrl: './ordersProgress.component.html',
  styleUrls: ['./ordersProgress.component.scss']
})
export class OrdersProgressComponent implements OnInit {
phase;
  constructor( public productService:ProductService) { }
allOrders = []
ownerEmail;
  ngOnInit() {
    this.orders()
  }
  orders(){

   this.productService.getAllOrders().subscribe((data: any) => {
    this.allOrders = data.product

  })
}
nextPhase(item){
   this.phase = "shipping phase"
   const orderShipped = {
     phase : this.phase ,
     ownerEmail : item.ownerEmail,
     orderId:item._id

   }
  this.productService.shippingPhase(orderShipped).subscribe((data: any) => {
    alert("Shipping")

  })

}
}
