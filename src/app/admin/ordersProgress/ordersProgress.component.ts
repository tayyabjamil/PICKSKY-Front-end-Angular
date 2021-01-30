import { AdminService } from './../admin.service';
import { Component, OnInit } from '@angular/core';
import * as jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'

@Component({
  selector: 'app-ordersProgress',
  templateUrl: './ordersProgress.component.html',
  styleUrls: ['./ordersProgress.component.scss']
})
export class OrdersProgressComponent implements OnInit {
  phase = "delievery";
  constructor(public adminService: AdminService) { }
  allOrders = []
  ownerEmail;
  cartData;

  ngOnInit() {
    this.orders()
  }

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

    // let doc = new jsPDF();
    autoTable(doc, {
      theme: 'plain',
      html: '#tableid',
      useCss: true,
      // showHead: 'everyPage',
      startY: 80,
    })

    doc.setPage(1)
    doc.setFont("helvetica");
    doc.setTextColor("black");
    doc.setFontSize(17);
    doc.text('Shirivas Food', 15, 15);

    doc.setPage(1)
    doc.setTextColor("black");
    doc.setFontSize(10);
    doc.text('Name', 15, 35);

    doc.setPage(1)
    doc.setTextColor("black");
    doc.setFontSize(10);
    doc.text((data.firstName.toString() + ' ' + data.lastName.toString()), 15, 40);

    doc.setPage(1)
    doc.setTextColor("black");
    doc.setFontSize(10);
    doc.text('country', 15, 50);

    doc.setPage(1)
    doc.setTextColor("black");
    doc.setFontSize(10);
    doc.text(data.contry.toString(), 15, 55);

    doc.setPage(1)
    doc.setTextColor("black");
    doc.setFontSize(10);
    doc.text('Address', 15, 65);

    doc.setPage(1)
    doc.setTextColor("black");
    doc.setFontSize(10);
    doc.text(data.adress.toString(), 15, 70);


    // doc.setPage(1)
    // doc.setTextColor("black");
    // doc.setFontSize(10);
    // doc.text("Order No", 160, 35);

    // doc.setPage(1)
    // doc.setTextColor("black");
    // doc.setFontSize(10);
    // doc.text('122322', 160, 40);

    doc.setPage(1)
    doc.setTextColor("black");
    doc.setFontSize(10);
    doc.text('Status', 160, 35);

    doc.setPage(1)
    doc.setTextColor("black");
    doc.setFontSize(10);
    doc.text(data.phase.toString(), 160, 40);

    doc.setPage(1)
    doc.setTextColor("black");
    doc.setFontSize(10);
    doc.text('Total', 160, 50);

    doc.setPage(1)
    doc.setTextColor("black");
    doc.setFontSize(10);
    doc.text(data.total.toString(), 160, 55);

    // Save the PDF
    doc.save('Test.pdf');
  }
}
