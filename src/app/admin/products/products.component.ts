import { Component, OnInit } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/home/cart.service';
import { ProductService } from 'src/app/home/product.service';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor( public mediaObserver: MediaObserver,
    public productService: ProductService,
    public cartService: CartService,
    private router: Router,
    private adminService:AdminService
  ) {

  }
  mediaSub: Subscription;
  deviceXs: boolean;
  deviceLg: boolean;
  deviceMd: boolean;
  deviceSm: boolean;
  allProducts
  p: number = 1;

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

this.getAllProducts()
  }
  getAllProducts() {
    this.productService.getProducts().subscribe(
      (products) => {

        this.allProducts = products;
      },
      (error) => {
        console.log('error in getting all products');
      }
    );
  }
edit(item){
  this.router.navigate(['addProduct/',JSON.stringify(item)]);
}
delete(item){
  this.adminService.deleteProduct(item._id).subscribe((campaignData) => {

    alert('Deleted');
  }, (error) => {
    alert('failed');
  });
}


}
