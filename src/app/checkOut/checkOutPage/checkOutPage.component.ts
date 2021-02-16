import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { CartService } from '../../home/cart.service';
import { ProductService } from '../../home/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { Router } from '@angular/router';
import { MatStepper } from '@angular/material/stepper/stepper';
import { AdminService } from 'src/app/admin/admin.service';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import * as jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'
import {Country} from '@angular-material-extensions/select-country';
@Component({
  selector: 'app-checkOutPage',
  templateUrl: './checkOutPage.component.html',
  styleUrls: ['./checkOutPage.component.css']
})
export class CheckOutPageComponent implements OnInit {


  constructor(private _formBuilder: FormBuilder,
    private toastr: ToastrService,
    public cartService: CartService,
    public productService: ProductService,
    public authService: AuthService,
    public adminService:AdminService,
    private router: Router,
    public mediaObserver: MediaObserver,
    ) { }

    mediaSub: Subscription
    deviceXs: boolean;
    deviceLg: boolean;
    deviceMd: boolean;
    deviceSm: boolean;
    show: boolean;

  cartItems;

  printCol = [
    { name: 'Name' },
    { name: 'Total' },
  ];

  total;
  title = 'newMat';
  showSuccess: any;
  isLinear = false;
  dataOrder;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  public payPalConfig?: IPayPalConfig;
  refrence: string;
  previousData;
totalafterBonus=0;
accountBonus;
detection=0
showBonusError=''
loginFirst=''
backtoCheckOut;
  @ViewChild('stepper')  stepper: MatStepper;
  ngOnInit(

  ) {

    this.mediaSub = this.mediaObserver.media$.subscribe((result: MediaChange) => {
      console.log(result.mqAlias)
      this.deviceXs = result.mqAlias === 'xs'
      this.deviceSm = result.mqAlias === 'sm'
      this.deviceLg = result.mqAlias === 'lg'
      this.deviceMd = result.mqAlias === 'md'
      this.show = false;
    })

    this.initConfig();
    this.getCartItems()
    const data= JSON.parse(localStorage.getItem('checkOutForm'))

    this.firstFormGroup = this._formBuilder.group({
      email: [data?.email,Validators.required],
      fname: [data?.fname,Validators.required],
      lname: [data?.lname,Validators.required],
      city: [data?.city,Validators.required],
      adress: [data?.adress,Validators.required],
      contry: [data?.contry,Validators.required],
      code: [data?.code,Validators.required],
      state: [data?.state,Validators.required],
      appartment: [data?.appartment,Validators.required],

    });
    this.secondFormGroup = this._formBuilder.group({
      method: ['',]
    });
    this.thirdFormGroup = this._formBuilder.group({
      cardNo:[''],
      name:[''],
      expirationDate:[''],
      sequrityCode:['']

    });
    // this.getAllOrders()
  this.getAccountBonus()
  this.backtoCheckOut= localStorage.getItem('backtoCheckOut')
  if(this.backtoCheckOut == "true"){

    // this.move(2)
  }
}
onCountrySelected($event: Country) {
  console.log($event);
}
stepClick(ev)
 {console.log(ev)}
  getAccountBonus() {
 this.accountBonus=  localStorage.getItem('accountBonus')
  }
shipping(index){

  if(this.firstFormGroup.valid){
  this.stepper.selectedIndex = index;

}else{
  localStorage.setItem('checkOutForm', JSON.stringify(this.firstFormGroup.value));
}
}
payment(index){
  if(this.secondFormGroup.valid){
    this.stepper.selectedIndex = index;
  }

}
useBonus(){
  if(parseInt(this.accountBonus)>0){
    this.showBonusError=''

    this.adminService.updateBonus().subscribe((data: any) => {
      this.accountBonus = data.accountBonus
      localStorage.setItem('accountBonus', JSON.stringify(this.accountBonus));

    })
      this.detection = (10 / 100) * this.total

    return this.totalafterBonus
    }else{
      this.showBonusError='show'
    }
  }
  getCartItems() {
    this.cartItems = this.cartService.getProducts()
    console.log(this.cartItems)
  }
  getImage(imageId) {
    if (!imageId) return '';
    return this.productService.productImageUrl(imageId);
  }
  get getTotal() {
    this.total =  this.cartService.getTotalPrice();

    this.totalafterBonus = this.total-this.detection
    return this.totalafterBonus.toFixed(0);
  }

  order() {
    if(this.authService.getID()){
    this.authService.getemail()
    const orderData = {
      cartItems: this.cartItems,
      total: this.total,
      firstName: this.firstFormGroup.value.fname,
      lastName: this.firstFormGroup.value.lname,
      city: this.firstFormGroup.value.city,
      adress: this.firstFormGroup.value.adress,
      code: this.firstFormGroup.value.code,
      contry: this.firstFormGroup.value.contry,
      method: this.secondFormGroup.value.method,
      refrence: this.refrence,
      phase: "processing",
      ownerEmail: this.authService.getemail()

    }
    // this.printOrder(orderData);
    this.cartService.order(orderData).subscribe((data: any) => {
      this.toastr.success('Order Submitted Successfully', 'Success' )
      this.pdfDownload(orderData)
      this.router.navigate(['/'])
    })
    localStorage.setItem('backtoCheckOut',"");
    this.cartService.emptyProduct()
    }else{
      localStorage.setItem('backtoCheckOut',"true");
      this.loginFirst = 'show'

    }
  }
  move(index: number) {

    this.stepper.selectedIndex = index;
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

  // doc.setPage(1)
  // doc.setTextColor("black");
  // doc.setFontSize(15);
  // doc.text('Order date is :', 15, 40);

  // doc.setPage(1)
  // doc.setTextColor("black");
  // doc.setFontSize(10);
  // doc.text(data.date, 100, 40);

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
const PDFFILE =  doc.save('Test.pdf');
console.log(PDFFILE)
}

  get useAdress() {
    if (this.dataOrder) {
      this.previousData = this.dataOrder[0].adress;
      return this.previousData;
    }
  }

  private initConfig(): void {
    this.payPalConfig = {
      currency: 'EUR',
      clientId: 'sb',
      // tslint:disable-next-line: no-angle-bracket-type-assertion
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'EUR',
              value: '9.99',
              breakdown: {
                item_total: {
                  currency_code: 'EUR',
                  value: '9.99'
                }
              }
            },
            items: [
              {
                name: 'Enterprise Subscription',
                quantity: '1',
                category: 'DIGITAL_GOODS',
                unit_amount: {
                  currency_code: 'EUR',
                  value: '9.99',
                },
              }
            ]
          }
        ]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then(details => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });
      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        this.showSuccess = true;
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }


}
