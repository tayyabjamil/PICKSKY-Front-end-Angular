import { Component, OnInit } from '@angular/core';
import  {MediaObserver, MediaChange} from '@angular/flex-layout';
import  { Subscription } from 'rxjs';
import { CartService } from '../cart.service';
import { ProductService } from '../product.service';
@Component({
  selector: 'app-vegetables',
  templateUrl: './vegetables.component.html',
  styleUrls: ['./vegetables.component.scss']
})
export class VegetablesComponent implements OnInit {
  mediaSub:Subscription
  deviceXs:boolean;
  deviceLg:boolean;
  deviceMd:boolean;
  deviceSm:boolean;
products = []
vegProducts
  constructor(public mediaObserver:MediaObserver, public productService: ProductService,
    public cartService: CartService) { }


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
    this.productService.getCatagoryProducts('vegetables').subscribe((products) => {
      this.vegProducts = products;
    }, (error) => {
      console.log('error in getting all products');
    });
  }
   addProduct(item){
 this.cartService.addProduct(item);
   }
  }




