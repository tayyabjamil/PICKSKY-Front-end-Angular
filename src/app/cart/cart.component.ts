import { AuthService } from './../auth.service';
import { CartService } from './../home/cart.service'

import { ProductService } from './../home/product.service';
import { CustomizeComponent } from '../../app/home/customize/customize.component';
import { Component, OnInit , TemplateRef} from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems = [];
  total = 0;
  totalafterBonus = 0;
  detection = 0
  refrence: string;
  customizationData;
  modalRef: BsModalRef;
  constructor(public mediaObserver: MediaObserver
    ,public dialog: MatDialog,private modalService: BsModalService,public cartService: CartService, public productService: ProductService, public authService: AuthService) { }

  mediaSub: Subscription
  deviceXs: boolean;
  deviceLg: boolean;
  deviceMd: boolean;
  deviceSm: boolean;
  show: boolean;

  ngOnInit() {
    this.mediaSub = this.mediaObserver.media$.subscribe((result: MediaChange) => {
      console.log(result.mqAlias)
      this.deviceXs = result.mqAlias === 'xs'
      this.deviceSm = result.mqAlias === 'sm'
      this.deviceLg = result.mqAlias === 'lg'
      this.deviceMd = result.mqAlias === 'md'
      this.show = false;
    })

  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }
  confirm(): void {

    this.modalRef.hide();
  }

  decline(): void {

    this.modalRef.hide();
  }
  get getCartItems() {
    this.cartItems = this.cartService.getProducts()

    // console.log(this.cartItems)

    return this.cartItems
  }

  onCustomiseModal(item): void {
    const dialogRef = this.dialog.open(CustomizeComponent,{
      maxWidth: '100% !important',
      height: '60vh',
      data: { item: item }

    });

    dialogRef.afterClosed().subscribe(result => {
    //  item.customization = result;
    this.customizationData = result;
   const customized = true
    this.cartItems.forEach(cartData => {
       if(cartData._id===item._id){
         cartData.customiztion = result

        }
     });
     localStorage.setItem('cart', JSON.stringify(this.cartItems));
    //  result  = JSON.parse(localStorage.getItem('cart'));
    console.log('The dialog was closed'+this.cartItems);


    });
  }

  get customizationDataget() {
    return this.customizationData;
  }

  get getTotal() {
    this.total = this.cartService.getTotalPrice();

    this.totalafterBonus = this.total - this.detection
    return this.totalafterBonus.toFixed(0);
  }
  order() {
    this.authService.getemail()
    const orderData = {
      cartItems: this.cartItems,
      total: this.total,
      refrence: this.refrence,
      phase: "delievry phase",
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
  getBonus() {

    this.detection = (10 / 100) * this.total

    console.log(this.totalafterBonus)
    return this.totalafterBonus
  }
  removeProduct(product) {
    this.cartService.removeProduct(product)
  }

  discardProductFun(product) {
    this.cartService.discardProduct(product)
    this.modalRef.hide();
  }

  addProduct(item) {
    this.cartService.addProduct(item);
  }
}
