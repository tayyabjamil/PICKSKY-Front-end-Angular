import { AdminService } from './../admin.service';
import { Component, OnInit } from '@angular/core';
import * as jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ordersProgress',
  templateUrl: './ordersProgress.component.html',
  styleUrls: ['./ordersProgress.component.scss']
})
export class OrdersProgressComponent implements OnInit {
  phase = "delievery";
  constructor(public mediaObserver: MediaObserver,
     public adminService: AdminService

  ) { }

  mediaSub: Subscription
  deviceXs: boolean;
  deviceLg: boolean;
  deviceMd: boolean;
  deviceSm: boolean;
  search: true
  isShow:boolean
  placement="bottom-right"
  isSHowSearch=false

  ngOnInit() {
    this.mediaSub = this.mediaObserver.media$.subscribe((result: MediaChange) => {
      console.log(result.mqAlias)
      this.deviceXs = result.mqAlias === 'xs'
      this.deviceSm = result.mqAlias === 'sm'
      this.deviceLg = result.mqAlias === 'lg'
      this.deviceMd = result.mqAlias === 'md'
      this.orders()
    })
  }
  allOrders = []
  ownerEmail;
  cartDataYaxis;
  cartData;
  p: number = 1;

  orders() {
    this.adminService.getAllOrders().subscribe((data: any) => {
      this.allOrders = data.product
    })
  }

  get cartDataValue() {
    return this.cartData;
  }
  pdfDownload(item){
    setTimeout(() => {
      this.printOrder(item);
    }, 1000);

  }
  nextPhase(item,nextPhase) {
    this.cartData = item.cartData;
    const orderShipped = {
      phase: nextPhase,
      ownerEmail: item.ownerEmail,
      orderId: item._id
    }

    this.adminService.shippingPhase(orderShipped).subscribe((data: any) => {
      alert("Order sucessfully progressed to " + nextPhase)

    })

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
}
