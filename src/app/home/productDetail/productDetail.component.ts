import { Component, OnInit } from '@angular/core';
import  {MediaObserver, MediaChange} from '@angular/flex-layout';
import { ActivatedRoute } from '@angular/router';
import  { Subscription } from 'rxjs';
import { CartService } from '../cart.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-productDetail',
  templateUrl: './productDetail.component.html',
  styleUrls: ['./productDetail.component.scss']
})
export class ProductDetailComponent implements OnInit {
data;
ingredients
relatedProducts
  constructor(public cartService:CartService,public productService:ProductService,public route: ActivatedRoute,public mediaObserver:MediaObserver) { }
  mediaSub:Subscription
  deviceXs:boolean;
  deviceLg:boolean;
  deviceMd:boolean;
  deviceSm:boolean;

    ngOnInit() {
      window.scrollTo(0, 0);
      const object = this.route.snapshot.paramMap.get('id');
       this.data = JSON.parse(object);
      this.CatagoryProducts(this.data.catagory)
       if (this.data && this.data.ingredients) {
         this.ingredients = this.data.ingredients.toString().split(',');

      }
      this.mediaSub = this.mediaObserver.media$.subscribe((result:MediaChange)=>{
           console.log(result.mqAlias)
           this.deviceXs = result.mqAlias === 'xs'
           this.deviceSm = result.mqAlias ==='sm'
           this.deviceLg = result.mqAlias === 'lg'
           this.deviceMd = result.mqAlias === 'md'

         })
       }
       getImage(imageId) {
        // this.loadingImage = true;
        // this.loadingImage = false;
        if (!imageId) {
          return '';
        } else {
          return this.productService.productImageUrl(imageId.filename);
        }
      }
      getRelatedImage(imageId) {
        // this.loadingImage = true;
        // this.loadingImage = false;
        if (!imageId) {
          return '';
        } else {
          return this.productService.productImageUrl(imageId[0].filename);
        }
      }
      addProduct() {
        this.cartService.addProduct(this.data);
      }
      CatagoryProducts(catagory) {

          this.productService.getCatagoryProducts(catagory).subscribe((products: any) => {

           this.relatedProducts = products
          }, (error) => {
            console.log('error in getting all products');
          });

        }
      }
