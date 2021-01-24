import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { ProductService } from '../product.service';
import { MatDialog } from '@angular/material/dialog';
import { CustomizeComponent } from '../customize/customize.component';

@Component({
  selector: 'app-mainPage-listItem',
  templateUrl: './mainPage-listItem.component.html',
  styleUrls: ['./mainPage-listItem.component.scss']
})
export class MainPageListItemComponent implements OnInit {

  @Input() item;
  loadingImage = true;

  constructor(public productService: ProductService,
    public cartService: CartService,
    public dialog: MatDialog) { }

  ngOnInit() {
  }

  imageLoaded() {
    this.loadingImage = false;
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
    }
    this.cartService.addProduct(item);
  }

  removeProduct(item, productRef) {
    if (productRef) {
      let x = parseInt(productRef.innerText);
      productRef.innerText = x - 1 ;
    }
    this.cartService.removeProduct(item);
  }

  onCustomiseModal(item): void {
    const dialogRef = this.dialog.open(CustomizeComponent, {
      maxWidth: '100% !important',
      height: '100vh',
      data: { item: item }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }
}
