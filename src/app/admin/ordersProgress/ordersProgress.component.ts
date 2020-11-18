import { AdminService } from './../admin.service';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/home/product.service';

@Component({
  selector: 'app-ordersProgress',
  templateUrl: './ordersProgress.component.html',
  styleUrls: ['./ordersProgress.component.scss']
})
export class OrdersProgressComponent implements OnInit {
phase ="delievery phase";
  constructor( public adminService:AdminService) { }
allOrders = []
ownerEmail;
  ngOnInit() {
    this.orders()
  }
  orders(){

   this.adminService.getAllOrders().subscribe((data: any) => {
    this.allOrders = data.product

  })
}
nextPhase(item){

   const orderShipped = {
     phase : this.phase = "shipping phase" ,
     ownerEmail : item.ownerEmail,
     orderId:item._id

   }
  this.adminService.shippingPhase(orderShipped).subscribe((data: any) => {
    alert("Shipping")

  })

}
}
