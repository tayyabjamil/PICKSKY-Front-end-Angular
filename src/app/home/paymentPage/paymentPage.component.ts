import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-paymentPage',
  templateUrl: './paymentPage.component.html',
  styleUrls: ['./paymentPage.component.scss']
})
export class PaymentPageComponent implements OnInit {
  newPaymentForm: FormGroup;
  constructor(public productService:ProductService,public _formBuilder:FormBuilder) { }
  allpayments
  p: number = 1;
  ngOnInit() {
    this.newPaymentForm = this._formBuilder.group({
      cardNo: ['',Validators.required],
      name: ['',Validators.required],
      expirationDate: ['',Validators.required],
      sequrityCode: ['',Validators.required],

    });
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
  newPayment(){
    if(this.newPaymentForm.valid){
  this.productService.payment(this.newPaymentForm.value).subscribe((data: any) => {
 alert("New Payment Added")
   })
  }else{
    alert("fill the form")
  }
}
  }
