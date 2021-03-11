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
// import { Country } from '@angular-material-extensions/select-country';
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
    public adminService: AdminService,
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
  forthFormGroup: FormGroup;
  public payPalConfig?: IPayPalConfig;
  refrence: string;
  previousData;
  totalafterBonus = 0;
  accountBonus;
  detection = 0
  showBonusError = ''
  loginFirst = ''
  selectShippingMethod = ''
  backtoCheckOut;
  firstName: ''
  contry;
  paymentFormError = ''
  lastName: ''
  gotoCheckOut: true
  countryError = ''
  billingFormError = ''
  sameShipping = ''
  samebillingadress = false
  methodchecked = false
  methodcheckedbilling= false
  method: Boolean
  cardLength = ''
  @ViewChild('stepper') stepper: MatStepper;
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
    // const firstForm = JSON.parse(localStorage.getItem('firstForm'))
    // const secondForm = JSON.parse(localStorage.getItem('secondForm'))
    // const thirdForm = JSON.parse(localStorage.getItem('thirdForm'))
    // const forthForm = JSON.parse(localStorage.getItem('forthForm'))



    const dataEmail = JSON.parse(localStorage.getItem('email'))
    const fname = JSON.parse(localStorage.getItem('firstName'))
    const lname = JSON.parse(localStorage.getItem('lastname'))

    this.firstFormGroup = this._formBuilder.group({
      // dataEmail
      email: [dataEmail,],
      fname: [fname,],
      lname: [lname,],
      city: ['',],
      adress1: ['',],
      adress2: ['',],
      contry: ['',],
      code: ['',],
      state: ['',],
      appartment: ['',],

    });
    this.secondFormGroup = this._formBuilder.group({
      method: ['',]
    });

    this.thirdFormGroup = this._formBuilder.group({
      cardNo: ['',Validators.required],
      name: ['',Validators.required],
      expirationDate: ['',Validators.required],
      sequrityCode: ['',Validators.required],

    });
    this.forthFormGroup = this._formBuilder.group({
      billingemail: ['ds', Validators.required],
      billingfname: ['sd', Validators.required],
      billinglname: ['ds', Validators.required],
      billingcity: ['ds', Validators.required],
      billingadress1: ['', Validators.required],
      billingadress2: [''],
      billingcontry: ['', Validators.required],
      billingcode: ['', Validators.required],
      billingstate: ['', Validators.required],
      billingappartment: ['', Validators.required],
    });
    // this.getAllOrders()
    this.getAccountBonus()
    this.backtoCheckOut = localStorage.getItem('backtoCheckOut')
    if (this.backtoCheckOut == "true") {

      // this.move(2)
    }
  }
  methodcheckbilling(type) {
    this.methodcheckedbilling = !this.methodcheckedbilling
    if (this.methodcheckedbilling == true) {
      this.billingFormError = ''
      this.billingFormError = ''
      if (type === 'same') {
        this.samebillingadress = !this.samebillingadress

            this.forthFormGroup.controls['billingemail'].setValue(this.firstFormGroup.value.email);
            this.forthFormGroup.controls['billingfname'].setValue(this.firstFormGroup.value.fname);
            this.forthFormGroup.controls['billinglname'].setValue(this.firstFormGroup.value.lname);
            this.forthFormGroup.controls['billingcity'].setValue(this.firstFormGroup.value.city);
            this.forthFormGroup.controls['billingadress1'].setValue(this.firstFormGroup.value.adress1);
            this.forthFormGroup.controls['billingadress2'].setValue(this.firstFormGroup.value.adress2);
            this.forthFormGroup.controls['billingcontry'].setValue(this.firstFormGroup.value.contry);
            this.forthFormGroup.controls['billingcode'].setValue(this.firstFormGroup.value.code);
            this.forthFormGroup.controls['billingstate'].setValue(this.firstFormGroup.value.state);
            this.forthFormGroup.controls['billingappartment'].setValue(this.firstFormGroup.value.appartment);

      }
    } else {
           this.billingFormError = 'show'
           this.forthFormGroup.controls['billingemail'].setValue('');
           this.forthFormGroup.controls['billingfname'].setValue('');
           this.forthFormGroup.controls['billinglname'].setValue('');
           this.forthFormGroup.controls['billingcity'].setValue('');
           this.forthFormGroup.controls['billingadress1'].setValue('');
           this.forthFormGroup.controls['billingadress2'].setValue('');
           this.forthFormGroup.controls['billingcontry'].setValue('');
           this.forthFormGroup.controls['billingcode'].setValue('');
           this.forthFormGroup.controls['billingstate'].setValue('');
           this.forthFormGroup.controls['billingappartment'].setValue('');
    }
  }
  methodcheck() {
    this.methodchecked = !this.methodchecked
    if (this.methodchecked == true) {
      this.secondFormGroup.controls.method.setValue("checked");

      this.selectShippingMethod = ''
    } else {
      this.secondFormGroup.controls.method.setValue('');

      this.selectShippingMethod = 'show'
    }
    console.log(this.secondFormGroup.value.method)
  }

  stepClick(ev) { console.log(ev) }
  getAccountBonus() {
    this.accountBonus = localStorage.getItem('accountBonus')
  }
  shipping(index) {

    if (this.firstFormGroup.valid) {
      this.stepper.selectedIndex = index;
      this.countryError = ''
    } else {
      this.countryError = 'show'
    }
  }

  paymentDone() {

    if (this.thirdFormGroup.valid) {
      let count;
      const  userCount  = this.thirdFormGroup.value.cardNo.length;

   for (let index = 0; index < userCount; index++) {
       count = index
       count = index ++
      }
if(count<16){
  this.paymentFormError = ''
  this.cardLength = 'show'
}else{
  this.cardLength = ''
      if (this.forthFormGroup.valid) {

        this.move(3)

        this.billingFormError = ''
        this.paymentFormError = ''

      } else {
        this.billingFormError = 'show'
        this.paymentFormError = ''
      }
    }
  } else {

      this.paymentFormError = 'show'
    }

  }

  payment(index) {
    if (this.secondFormGroup.valid) {
      if (this.selectShippingMethod !== 'show') {
        this.stepper.selectedIndex = index;
        this.selectShippingMethod = ''
      }
    } else {
      this.selectShippingMethod = 'show'
    }

  }
  useBonus() {
    if (parseInt(this.accountBonus) > 0) {
      this.showBonusError = ''

      this.adminService.updateBonus().subscribe((data: any) => {
        this.accountBonus = data.accountBonus
        localStorage.setItem('accountBonus', JSON.stringify(this.accountBonus));

      })
      this.detection = (10 / 100) * this.total

      return this.totalafterBonus
    } else {
      this.showBonusError = 'show'
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
    this.total = this.cartService.getTotalPrice();

    this.totalafterBonus = this.total - this.detection
    return this.totalafterBonus.toFixed(0);
  }
  login() {
    localStorage.setItem('backtoCheckOut', "true");
    this.router.navigate(['login'])
  }
  order() {
    this.productService.payment(this.thirdFormGroup.value).subscribe((data: any) => {
      if (data) {
        if (this.authService.getID()) {
          this.authService.getemail()
          const orderData = {
            cartItems: this.cartItems,
            total: this.total,
            firstName: this.firstFormGroup.value.fname,
            lastName: this.firstFormGroup.value.lname,
            city: this.firstFormGroup.value.city,
            adress1: this.firstFormGroup.value.adress1,
            appartment: this.firstFormGroup.value.appartment,

            adress2: this.firstFormGroup.value.adress2,
            code: this.firstFormGroup.value.code,
            contry: this.firstFormGroup.value.contry,
            method: this.secondFormGroup.value.method,
            refrence: this.refrence,
            phase: "processing",
            ownerEmail: this.authService.getemail()

          }
          // this.printOrder(orderData);
          this.cartService.order(orderData).subscribe((data: any) => {
            this.toastr.success('Order Submitted Successfully', 'Success')
            this.pdfDownload(orderData)
            localStorage.setItem('backtoCheckOut', "");
            this.router.navigate(['/myOrders'])
          })

          this.cartService.emptyProduct()
        } else {

          this.loginFirst = 'show'
          localStorage.setItem('firstForm', this.firstFormGroup.value);
          localStorage.setItem('secondForm', this.secondFormGroup.value);
          localStorage.setItem('thirdForm', this.thirdFormGroup.value);
          localStorage.setItem('forthForm', this.forthFormGroup.value);
        }

      }
    }, (error) => {
      alert("payment not succesfull")
    })

  }
  move(index: number) {

    this.stepper.selectedIndex = index;
  }

  pdfDownload(item) {
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
    const PDFFILE = doc.save('Test.pdf');
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
