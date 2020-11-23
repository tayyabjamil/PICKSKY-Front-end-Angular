import { Component, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { CartService } from '../cart.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.scss']
})
export class MyordersComponent implements OnInit {
  allOrders = [];

  constructor(public mediaObserver:MediaObserver,
    public productService:ProductService,
    public cartService:CartService) { }

  ngOnInit() {
    this.myOrders()
  }
  myOrders() {
    this.productService.getOrders().subscribe((products:any) => {
      this.allOrders = products.orders;
    }, (error) => {
      console.log('error in getting all products');
    });
  }
  orderDetails(item){

  }
  getImage(imageId) {
    if (!imageId) return '';
    return this.productService.productImageUrl(imageId);
  }
orderCompleted(item){

}
}
