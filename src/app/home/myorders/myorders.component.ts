import { Component, OnInit } from '@angular/core';

import { CartService } from '../cart.service';
import { ProductService } from '../product.service';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { OrderPipe } from 'ngx-order-pipe';
import * as jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.css']
})
export class MyordersComponent implements OnInit {
  allOrders = [];
  canceledOrders = [];
  friendEmail;
  public status: any;
  sortedCollection=[]
  refrenceCode;
  selectedIndex = null;
p: number = 1;
  constructor(public mediaObserver: MediaObserver,private orderPipe: OrderPipe,
    public productService: ProductService,
    public cartService: CartService) { }
  mediaSub: Subscription
  deviceXs: boolean;
  deviceLg: boolean;
  deviceMd: boolean;
  deviceSm: boolean;
  orderBy;
  reverse = false;

  ngOnInit() {
    this.mediaSub = this.mediaObserver.media$.subscribe((result: MediaChange) => {
      console.log(result.mqAlias)
      this.deviceXs = result.mqAlias === 'xs'
      this.deviceSm = result.mqAlias === 'sm'
      this.deviceLg = result.mqAlias === 'lg'
      this.deviceMd = result.mqAlias === 'md'

    })
    this.myOrders()
  }

  setOrder(order, reverse) {
    // this.allOrders = this.orderPipe.transform(this.allOrders, value);
    // console.log(this.allOrders);
    this.orderBy = order;
    this.reverse = reverse;
  }

  myOrders() {
    this.productService.getOrders().subscribe((products: any) => {
      this.allOrders = products.orders;

      this.allOrders.forEach(element => {

        if (element.cancelOrder == true) {
          this.canceledOrders.push(element)
        }
      });

    }, (error) => {
      console.log('error in getting all products');
    });
  }
  pdfDownload(item){
    setTimeout(() => {
      this.printOrder(item);
    }, 1000);

  }
printOrder(data) {

  const doc = new jsPDF.jsPDF()


  doc.setPage(1)
  doc.setFont("helvetica");
  doc.setTextColor("black");
  doc.setFontSize(25);
  doc.text('Shirivas Food', 15, 15);

  doc.setPage(1)
  doc.setTextColor("black");
  doc.setFontSize(15);
  doc.text('Name :', 15, 30);

  doc.setPage(1)
  doc.setTextColor("black");
  doc.setFontSize(10);
  doc.text((data.firstName.toString() + ' ' + data.lastName.toString()), 100, 30);

  doc.setPage(1)
  doc.setTextColor("black");
  doc.setFontSize(15);
  doc.text('Order date is :', 15, 40);

  doc.setPage(1)
  doc.setTextColor("black");
  doc.setFontSize(10);
  doc.text(data.date, 100, 40);

  doc.setPage(1)
  doc.setTextColor("black");
  doc.setFontSize(15);
  doc.text('Order Adress is :', 15, 50);

  doc.setPage(1)
  doc.setTextColor("black");
  doc.setFontSize(10);
  doc.text('Adress :', 15, 55);

  doc.setPage(1)
  doc.setTextColor("black");
  doc.setFontSize(10);
  doc.text('Contry :', 15, 60);

  doc.setPage(1)
  doc.setTextColor("black");
  doc.setFontSize(10);
  doc.text('City :', 15, 65);

  doc.setPage(1)
  doc.setTextColor("black");
  doc.setFontSize(10);
  doc.text(data.adress, 100, 55);

  doc.setPage(1)
  doc.setTextColor("black");
  doc.setFontSize(10);
  doc.text(data.contry, 100, 60);

  doc.setPage(1)
  doc.setTextColor("black");
  doc.setFontSize(10);
  doc.text(data.city, 100, 65);


  doc.setPage(1)
  doc.setTextColor("black");
  doc.setFontSize(15);
  doc.text('Order Status is :', 15, 70);


  doc.setPage(1)
  doc.setTextColor("black");
  doc.setFontSize(10);
  doc.text(data.phase, 100, 70);


  doc.setPage(1)
  doc.setTextColor("black");
  doc.setFontSize(15);
  doc.text('Order Total is', 15, 80);

  doc.setPage(1)
  doc.setTextColor("black");
  doc.setFontSize(10);
  // doc.text(data.total, 160, 55);

  doc.setPage(1)
  doc.setTextColor("black");
  doc.setFontSize(15);
  doc.text('Shipping method :', 15, 90);


  doc.setPage(1)
  doc.setTextColor("black");
  doc.setFontSize(15);
  doc.text('Payment infomation :', 15, 100);

  // Save the PDF
  doc.save('Test.pdf');
}

  cancelOrders() {}

  orderDetails(item) { }

  getImage(imageId) {
    if (!imageId) return '';
    return this.productService.productImageUrl(imageId);
  }

  orderCancel(id) {
    this.productService.cancelOrder(id).subscribe((products: any) => {
      alert("order canceled")
    }, (error) => {
      alert(error.error.message)
    });
  }


  onSelectedItem(i) {
    if (this.selectedIndex == i) {
      this.selectedIndex = null
    } else {
      this.selectedIndex = i
    }
  }

}
