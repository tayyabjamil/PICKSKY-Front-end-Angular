import { Component, OnInit , TemplateRef} from '@angular/core';

import { CartService } from '../cart.service';
import { ProductService } from '../product.service';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { OrderPipe } from 'ngx-order-pipe';
import * as jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
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
 modalRef: BsModalRef;
  message: string;
   cartDataYaxis = 0

  constructor(public mediaObserver: MediaObserver,private orderPipe: OrderPipe,
    public productService: ProductService,private modalService: BsModalService,
    public cartService: CartService,public toastr : ToastrService) { }
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
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }
  confirm(): void {
    this.message = 'Confirmed!';
    this.modalRef.hide();
  }

  decline(): void {
    this.message = 'Declined!';
    this.modalRef.hide();
  }
printOrder(data) {

  const doc = new jsPDF.jsPDF()


  doc.setPage(1)
  doc.setFont("helvetica");
  doc.setTextColor("black");
  doc.setFontSize(20);
  doc.text('Thanks for your order Shirivas', 60, 25);

  doc.setPage(1)
  doc.setTextColor("black");
  doc.setFontSize(15);
  doc.text((data.firstName.toString() + ' ' + data.lastName.toString()), 90, 45);

  doc.setPage(1)
  doc.setTextColor("black");
  doc.setFontSize(15);
  doc.text('Delivery :' + data.date, 80, 55);

  doc.setPage(1)
  doc.setTextColor("black");
  doc.text('-----------------------------------------------------------------------------------------------------------', 10,  65);


  let y = 80;
data.cartData.forEach(element => {

  doc.setPage(1)
  doc.setTextColor("black");
  doc.setFontSize(15);
  doc.text( element.productCount.toString(), 20, y);


  doc.setPage(1)
  doc.setTextColor("black");
  doc.setFontSize(15);
  doc.text( element.name, 40, y);

  doc.setPage(1)
  doc.setTextColor("black");
  doc.setFontSize(15);
  doc.text( element.price.toString(), 180, y);
  y = y +10
  this.cartDataYaxis = y
});


doc.setPage(1)
doc.setTextColor("black");
doc.text('-----------------------------------------------------------------------------------------------------------', 10, this.cartDataYaxis + 10);

doc.setPage(1)
doc.setTextColor("black");
doc.setFontSize(15);
doc.text('Status ', 15, this.cartDataYaxis + 20);


doc.setPage(1)
doc.setTextColor("black");
doc.setFontSize(15);
doc.text(data.phase, 170, this.cartDataYaxis + 20);


doc.setPage(1)
doc.setTextColor("black");
doc.setFontSize(15);
doc.text('Total ', 15, this.cartDataYaxis + 30);

doc.setPage(1)
doc.setTextColor("black");
doc.setFontSize(15);
doc.text(data.total.toString(), 180, this.cartDataYaxis + 30);

doc.setPage(1)
doc.setTextColor("black");
doc.text('-----------------------------------------------------------------------------------------------------------', 10, this.cartDataYaxis + 40);



  doc.setPage(1)
  doc.setTextColor("black");
  doc.setFontSize(25);
  doc.text('Delievry Adress ', 80, this.cartDataYaxis + 60);


  doc.setPage(1)
  doc.setTextColor("black");
  doc.setFontSize(15);
  doc.text(data.adress1 +','+data.appartment +',' + data.city+',' + data.contry , 80, this.cartDataYaxis + 70);




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
    this.modalRef.hide();
    this.productService.cancelOrder(id).subscribe((products: any) => {

      this.toastr.success('refund will process (5-7 business days)', 'Success' )

    }, (error) => {

      this.toastr.error(error.error.message, 'Failed' )

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
