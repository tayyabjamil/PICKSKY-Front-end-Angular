import { Component, OnInit } from '@angular/core';
import  {MediaObserver, MediaChange} from '@angular/flex-layout';
import  { Subscription } from 'rxjs';
import { CartService } from '../cart.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-snacksandbeverages',
  templateUrl: './snacksandbeverages.component.html',
  styleUrls: ['./snacksandbeverages.component.scss']
})
export class SnacksandbeveragesComponent implements OnInit {
products = []
  constructor(public mediaObserver:MediaObserver, public productService: ProductService,
    public cartService: CartService) { }
  mediaSub:Subscription
  deviceXs:boolean;
  deviceLg:boolean;
  deviceMd:boolean;
  deviceSm:boolean;
  snacksProducts;
    ngOnInit() {
      this.mediaSub = this.mediaObserver.media$.subscribe((result:MediaChange)=>{
           console.log(result.mqAlias)
           this.deviceXs = result.mqAlias === 'xs'
           this.deviceSm = result.mqAlias ==='sm'
           this.deviceLg = result.mqAlias === 'lg'
           this.deviceMd = result.mqAlias === 'md'

         })
         this.getCatagoryProducts();
        }

        getCatagoryProducts() {
          this.productService.getCatagoryProducts('snacks').subscribe((products) => {
            this.snacksProducts = products;
          }, (error) => {
            console.log('error in getting all products');
          });
        }
         addProduct(item){
       this.cartService.addProduct(item);
         }
  }

