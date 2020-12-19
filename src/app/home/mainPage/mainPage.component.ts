import { CartService } from './../cart.service';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { NgImageSliderComponent } from 'ng-image-slider';

@Component({
  selector: 'app-mainPage',
  templateUrl: './mainPage.component.html',
  styleUrls: ['./mainPage.component.scss'],
})
export class MainPageComponent implements OnInit {
  allProducts;
  featuredProducts;
  loadingData = true;
  loadingImage = true;

  // @ViewChild('nav') slider: NgImageSliderComponent;
  constructor(
    public mediaObserver: MediaObserver,
    public productService: ProductService,
    public cartService: CartService,
    private router: Router,
  ) {

  }
  mediaSub: Subscription;
  deviceXs: boolean;
  deviceLg: boolean;
  deviceMd: boolean;
  deviceSm: boolean;

  //   imageObject = [{
  //     image: 'assets/img/slider/1.jpg',
  //     thumbImage: 'assets/img/slider/1_min.jpeg',
  //     alt: 'alt of image',
  //     title: 'title of image'
  // }, {
  //     image: '.../iOe/xHHf4nf8AE75h3j1x64ZmZ//Z==', // Support base64 image
  //     thumbImage: '.../iOe/xHHf4nf8AE75h3j1x64ZmZ//Z==', // Support base64 image
  //     title: 'Image title', //Optional: You can use this key if want to show image with title
  //     alt: 'Image alt' //Optional: You can use this key if want to show image with alt
  // }
  // ];

  imagesUrl = [
    {
      thumbImage: 'assets/images/slideimg1.jpg',
      title: 'Bakery & Pastry',
      alt: 'Image alt',
      routeTo: 'bakery',
    },
    {
      thumbImage: 'assets/images/slideimg2.jpg',
      alt: 'alt of image',
      title: 'Pickles',
    },
    {
      thumbImage: 'assets/images/slideimg3.jpg',
      title: 'Image title',
      alt: 'Image alt',
    },
    {
      thumbImage: 'assets/images/slideimg4.jpg',
      alt: 'alt of image',
      title: 'Fish & Meat',
    },
    {
      thumbImage: 'assets/images/slideimg5.jpg',
      title: 'TraditionalPowders',
      alt: 'Image alt',
    },
    {
      thumbImage: 'assets/images/slideimg6.jpg',
      alt: 'alt of image',
      title: 'Snakes & Beverages',
    },
    {
      thumbImage: 'assets/images/slideimg1.jpg',
      title: 'Bakery & Pastry',
      alt: 'Image alt',
      routeTo: 'bakery',
    },
    {
      thumbImage: 'assets/images/slideimg2.jpg',
      alt: 'alt of image',
      title: 'Pickles',
    },
    {
      thumbImage: 'assets/images/slideimg3.jpg',
      title: 'Image title',
      alt: 'Image alt',
    },
    {
      thumbImage: 'assets/images/slideimg4.jpg',
      alt: 'alt of image',
      title: 'Fish & Meat',
    },
    {
      thumbImage: 'assets/images/slideimg5.jpg',
      title: 'TraditionalPowders',
      alt: 'Image alt',
    },
    {
      thumbImage: 'assets/images/slideimg6.jpg',
      alt: 'alt of image',
      title: 'Snakes & Beverages',
    },
  ];

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
    this.getAllProducts();
    this.getfeaturedProducts();
  }

  // onImageClick(args) {
  //   console.log(args)
  //   this.router.navigate([this.imageObject[args].routeTo])
  // }

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

  getfeaturedProducts() {
    this.productService.featuredProducts().subscribe(
      (products) => {
        this.featuredProducts = products;
      },
      (error) => {
        console.log('error in getting featuredProducts ');
      }
    );
  }

  addProduct(item) {
    this.cartService.addProduct(item);
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

}
