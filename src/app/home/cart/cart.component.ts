import { AuthService } from './../../auth.service';
import { CartService } from './../cart.service';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
cartItems = [];
total = 0;
totalafterBonus=0;
detection=0
refrence:string;
showSuccess :any;
public payPalConfig?: IPayPalConfig;
constructor(public cartService:CartService, public productService:ProductService,public authService:AuthService) { }

  ngOnInit() {
  this.getCartItems()
  this.initConfig();
  }
getCartItems(){
 this.cartItems = this.cartService.getProducts()
 console.log(this.cartItems)
}

get getTotal() {
  this.total =  this.cartService.getTotalPrice();

  this.totalafterBonus = this.total-this.detection
  return this.totalafterBonus.toFixed(2);
}
   order(){
    this.authService.getemail()
    const orderData = {
      cartItems : this.cartItems,
      total : this.total,
      refrence: this.refrence,
      phase:"delievry phase",
      ownerEmail: this.authService.getemail()
     }
    this.cartService.order(orderData).subscribe((data: any) => {
      alert("Order Sent")

   })
}
getImage(imageId) {
  if (!imageId) return '';
  return this.productService.productImageUrl(imageId);
}
 getBonus(){

   this.detection = (10 / 100) * this.total

   console.log(this.totalafterBonus)
   return this.totalafterBonus
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
