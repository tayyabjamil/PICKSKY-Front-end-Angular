import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { ProductService } from '../product.service';
import { MatDialog } from '@angular/material/dialog';
import { CustomizeComponent } from '../customize/customize.component';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mainPage-listItem',
  templateUrl: './mainPage-listItem.component.html',
  styleUrls: ['./mainPage-listItem.component.scss']
})
export class MainPageListItemComponent implements OnInit {

  @Input() item;
  loadingImage = true;
  cartItems
  customizationData
  constructor(public productService: ProductService,
    public mediaObserver: MediaObserver,
    public cartService: CartService,
    public router: Router,
    public dialog: MatDialog) { }
  mediaSub: Subscription;
  deviceXs: boolean;
  deviceLg: boolean;
  deviceMd: boolean;
  deviceSm: boolean;

  ngOnInit() {
    this.mediaSub = this.mediaObserver.media$.subscribe(
      (result: MediaChange) => {
        console.log(result.mqAlias);
        this.deviceXs = result.mqAlias === 'xs';
        this.deviceSm = result.mqAlias === 'sm';
        this.deviceLg = result.mqAlias === 'lg';
        this.deviceMd = result.mqAlias === 'md';
      }
    );

  }

  imageLoaded() {
    this.loadingImage = false;
  }
  get products() {
    return this.item;
  }

  get productCount() {
    return this.item.productCount;
  }
  details(item) {
    this.router.navigate(['detail/', JSON.stringify(item)])
  }
  get loadingImageGetter() {
    return this.loadingImage;
  }

  getImage(imageId) {
    // this.loadingImage = true;
    // this.loadingImage = false;
    if (!imageId) {
      return '';
    } else {
      return this.productService.productImageUrl(imageId);
    }
  }

  addProduct(item, productRef) {
    if (productRef) {
      let x = parseInt(productRef.innerText);
      productRef.innerText = x + 1;
      item.productCount = item.productCount + 1;
    }
    this.cartService.addProduct(item);
  }

  removeProduct(item, productRef) {
    if (productRef) {
      item.productCount = item.productCount -1;
      let x = parseInt(productRef.innerText);
      if (x > 0) {
        productRef.innerText = x - 1;
        this.cartService.removeProduct(item);
      }
    }
  }
  get getCartItems() {
    this.cartItems = this.cartService.getProducts()

    // console.log(this.cartItems)

    return this.cartItems
  }

  onCustomiseModal(item): void {
    const dialogRef = this.dialog.open(CustomizeComponent, {
      maxWidth: '100% !important',
      height: '80vh',
      data: { item: item }

    });

    dialogRef.afterClosed().subscribe(result => {
      //  item.customization = result;
      this.customizationData = result;
      const customized = true
      this.cartItems.forEach(cartData => {
        if (cartData._id === item._id) {
          cartData.customiztion = result

        }
      });
      localStorage.setItem('cart', JSON.stringify(this.cartItems));
      //  result  = JSON.parse(localStorage.getItem('cart'));
      console.log('The dialog was closed' + this.cartItems);


    });
  }

}
