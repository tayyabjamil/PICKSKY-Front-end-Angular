import { Component, OnInit } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { CartService } from '../cart.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-specialoffers',
  templateUrl: './specialoffers.component.html',
  styleUrls: ['./specialoffers.component.scss']
})
export class SpecialOffersComponent implements OnInit {

  constructor(public mediaObserver: MediaObserver, public productService: ProductService,
    public cartService: CartService) { }
  mediaSub: Subscription
  deviceXs: boolean;
  deviceLg: boolean;
  deviceMd: boolean;
  deviceSm: boolean;

  specialoffersProducts;
  ngOnInit() {
    this.mediaSub = this.mediaObserver.media$.subscribe((result: MediaChange) => {
      console.log(result.mqAlias)
      this.deviceXs = result.mqAlias === 'xs'
      this.deviceSm = result.mqAlias === 'sm'
      this.deviceLg = result.mqAlias === 'lg'
      this.deviceMd = result.mqAlias === 'md'

    })
    //  this.getproducts()
  }
  // getproducts(){
  //  this.products = this.productService.getProducts();
  // }
  addProduct(item) {
    this.cartService.addProduct(item);
  }
  getCatagoryProducts() {
    this.productService.getProducts().subscribe((products: any) => {
      let pageProduct = products.filter((productPage) => productPage.catagory === 'specialoffers')
      this.specialoffersProducts = pageProduct;
    }, (error) => {
      console.log('error in getting all products');
    });
  }
}

