import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { CartService } from '../../home/cart.service';
import { ProductService } from '../../home/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { Router } from '@angular/router';
import { MatStepper } from '@angular/material/stepper/stepper';

@Component({
  selector: 'app-checkOutPage',
  templateUrl: './checkOutPage.component.html',
  styleUrls: ['./checkOutPage.component.css']
})
export class CheckOutPageComponent implements OnInit {


  constructor(private _formBuilder: FormBuilder,
    public cartService: CartService,
    public productService: ProductService,
    public authService: AuthService, private router: Router, ) { }


  cartItems;

  printCol = [
    { name: 'Name' },
    { name: 'Total' },
  ];

  total;
  title = 'newMat';
  showSuccess: any;
  isLinear = true;
  dataOrder;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  public payPalConfig?: IPayPalConfig;
  refrence: string;
  previousData;
  // @ViewChild('stepper') private stepper: MatStepper;
  @ViewChild('stepper') public stepper: MatStepper;
  ngOnInit() {
    this.initConfig();
    this.getCartItems()

    this.firstFormGroup = this._formBuilder.group({
      email: ['',],
      fname: ['',],
      lname: ['',],
      city: ['',],
      adress: ['',],
      contry: ['',],
      code: ['']
      ,
    });
    this.secondFormGroup = this._formBuilder.group({
      method: ['',]
    });
    this.thirdFormGroup = this._formBuilder.group({
      // contact: ['', Validators.required],

    });
    this.getAllOrders()
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
    return this.total
  }
  order() {
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
      phase: "delievry phase",
      ownerEmail: this.authService.getemail()
    }

    // this.printOrder(orderData);
    this.cartService.order(orderData).subscribe((data: any) => {
      // this.router.navigate(['/'])
    })
    // this.cartService.emptyProduct()
  }
  move(index: number) {
    this.stepper.selectedIndex = index;
  }

  getAllOrders() {
    let id = this.authService.getID()
    this.productService.getOrders().subscribe((data: any) => {
      this.dataOrder = data.orders.toString()
    })
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
