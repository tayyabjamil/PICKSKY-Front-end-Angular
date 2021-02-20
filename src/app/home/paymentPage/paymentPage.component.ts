import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-paymentPage',
  templateUrl: './paymentPage.component.html',
  styleUrls: ['./paymentPage.component.scss']
})
export class PaymentPageComponent implements OnInit {

  constructor(public productService:ProductService) { }
  allpayments
  p: number = 1;
  ngOnInit() {
    this.getAllPayments()
  }
  getAllPayments() {
    this.productService.getAllPayments().subscribe(
      (payments) => {

        this.allpayments = payments;
      },
      (error) => {
        console.log('error in getting all payments');
      }
    );
  }
}
