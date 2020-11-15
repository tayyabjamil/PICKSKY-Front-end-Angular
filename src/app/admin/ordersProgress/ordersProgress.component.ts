import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/home/product.service';

@Component({
  selector: 'app-ordersProgress',
  templateUrl: './ordersProgress.component.html',
  styleUrls: ['./ordersProgress.component.scss']
})
export class OrdersProgressComponent implements OnInit {

  constructor( public productService:ProductService) { }
allOrders = []
  ngOnInit() {
    this.orders()
  }
  orders(){

   this.productService.getAllOrders().subscribe((data: any) => {
    this.allOrders = data.product

  })
}
}
