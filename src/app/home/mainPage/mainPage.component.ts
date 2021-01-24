import { CartService } from './../cart.service';
import { ProductService } from './../product.service';
import { Component, OnInit, Input } from '@angular/core';
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
  @Input() search
  allProducts;
  featuredProducts;
  loadingData = true;
  loadingImage = true;
  searchProductsData = [];
  productSearch: Subscription;
  categories;
  cartItems = []
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

    this.productSearch = this.productService.searchItems.subscribe((searchitem) => {
      if (searchitem) {
        this.searchProductsData = this.allProducts.find((productItem) => {
          if (productItem && productItem.name && productItem.name.find(searchitem)) {
            return true;
          }
        })
        this.searchProductsData;
      } else {
        this.searchProductsData = this.allProducts;
      }
    });
    this.categories = this.productService.categories
  }

  scrollToTrending(){
    document.getElementById("trending").scrollIntoView({ behavior: "smooth" })

  }


  scrollToFeatured() {
    document.getElementById("target").scrollIntoView({ behavior: "smooth" })
  }

  get searchProducts() {
    let search = this.productService.searchProducts()
    return search;
  }

  getAllProducts() {
    this.productService.getProducts().subscribe(
      (products) => {

        // this.allProducts = products;
        // this.searchProductsData = this.allProducts
        let tempProducts: any = products;
        let cartProducts = this.cartService.getProducts();
        if (tempProducts && cartProducts) {
          tempProducts.forEach(item => {
            cartProducts.forEach((cartItem) => {
              if (item._id === cartItem._id) {
                item.productCount = cartItem.productCount;
              }
            })
          });
        }
        this.searchProductsData = this.allProducts = tempProducts

        // this.searchProductsData = products;
      },
      (error) => {
        console.log('error in getting all products');
      }
    );
  }

  getfeaturedProducts() {
    this.productService.featuredProducts().subscribe(
      (products) => {
        let tempProducts: any = products;
        let cartProducts = this.cartService.getProducts();
        if (tempProducts && cartProducts) {
          tempProducts.forEach(item => {
            cartProducts.forEach((cartItem) => {
              if (item._id === cartItem._id) {
                item.productCount = cartItem.productCount;
              }
            })
          });
        }
        this.featuredProducts = tempProducts
      },
      (error) => {
        console.log('error in getting featuredProducts ');
      }
    );
  }

  addProduct(item) {
    this.cartService.addProduct(item);
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

  removeProduct(product) {
    this.cartService.removeProduct(product)
  }

  onImageClick(index) {
    this.router.navigate(['catagory/' + this.categories[index].routeTo]);

  }
}
