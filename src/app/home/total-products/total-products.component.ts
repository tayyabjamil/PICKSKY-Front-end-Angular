import { Component, OnInit, Input} from '@angular/core';

import { CartService } from '../cart.service';
import { ProductService } from '../product.service';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { OrderPipe } from 'ngx-order-pipe';
import * as jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Router } from '@angular/router';
import { NgImageSliderComponent } from 'ng-image-slider';


@Component({
  selector: 'app-total-products',
  templateUrl: './total-products.component.html',
  styleUrls: ['./total-products.component.scss']
})
export class TotalProductsComponent implements OnInit {

  allOrders = [];
  canceledOrders = [];
  friendEmail;
  public status: any;
  sortedCollection = []
  refrenceCode;
  selectedIndex = null;
  p: number = 1;
  @Input() search
  allProducts;
  featuredProducts;
  loadingData = true;
  loadingImage = true;
  searchProductsData;
  productSearch: Subscription;
  categories;
  cartItems = []
  constructor(public mediaObserver: MediaObserver, private orderPipe: OrderPipe,
    public productService: ProductService,
    public cartService: CartService,
    private router: Router,) { }
  mediaSub: Subscription
  deviceXs: boolean;
  deviceLg: boolean;
  deviceMd: boolean;
  deviceSm: boolean;
  orderBy;
  reverse = false;

  ngOnInit() {
    this.mediaSub = this.mediaObserver.media$.subscribe((result: MediaChange) => {
      console.log(result.mqAlias)
      this.deviceXs = result.mqAlias === 'xs'
      this.deviceSm = result.mqAlias === 'sm'
      this.deviceLg = result.mqAlias === 'lg'
      this.deviceMd = result.mqAlias === 'md'

    })
    this.myOrders()
    this.getAllProducts();
    this.getfeaturedProducts();

    this.productSearch = this.productService.searchItems.subscribe((searchitem) => {

      this.searchProductsData = searchitem
      // if (searchitem) {
      //   this.searchProductsData = this.allProducts.foreach((productItem) => {
      //     if (productItem && productItem.name && productItem.name.find(searchitem)) {
      //       return true;
      //     }
      //   });

      //   this.searchProductsData;
      // } else {
      //   this.searchProductsData = this.allProducts;
      // }
    });
    this.categories = this.productService.categories
  }

  setOrder(order, reverse) {
    // this.allOrders = this.orderPipe.transform(this.allOrders, value);
    // console.log(this.allOrders);
    this.orderBy = order;
    this.reverse = reverse;
  }

  myOrders() {
    this.productService.getOrders().subscribe((products: any) => {
      this.allOrders = products.orders;

      this.allOrders.forEach(element => {

        if (element.cancelOrder == true) {
          this.canceledOrders.push(element)
        }
      });

    }, (error) => {
      console.log('error in getting all products');
    });
  }
  pdfDownload(item) {
    setTimeout(() => {
      this.printOrder(item);
    }, 1000);

  }
  printOrder(data) {

    const doc = new jsPDF.jsPDF()


    doc.setPage(1)
    doc.setFont("helvetica");
    doc.setTextColor("black");
    doc.setFontSize(25);
    doc.text('Shirivas Food', 15, 15);

    doc.setPage(1)
    doc.setTextColor("black");
    doc.setFontSize(15);
    doc.text('Name :', 15, 30);

    doc.setPage(1)
    doc.setTextColor("black");
    doc.setFontSize(10);
    doc.text((data.firstName.toString() + ' ' + data.lastName.toString()), 100, 30);

    doc.setPage(1)
    doc.setTextColor("black");
    doc.setFontSize(15);
    doc.text('Order date is :', 15, 40);

    doc.setPage(1)
    doc.setTextColor("black");
    doc.setFontSize(10);
    doc.text(data.date, 100, 40);

    doc.setPage(1)
    doc.setTextColor("black");
    doc.setFontSize(15);
    doc.text('Order Adress is :', 15, 50);

    doc.setPage(1)
    doc.setTextColor("black");
    doc.setFontSize(10);
    doc.text('Adress :', 15, 55);

    doc.setPage(1)
    doc.setTextColor("black");
    doc.setFontSize(10);
    doc.text('Contry :', 15, 60);

    doc.setPage(1)
    doc.setTextColor("black");
    doc.setFontSize(10);
    doc.text('City :', 15, 65);

    doc.setPage(1)
    doc.setTextColor("black");
    doc.setFontSize(10);
    doc.text(data.adress, 100, 55);

    doc.setPage(1)
    doc.setTextColor("black");
    doc.setFontSize(10);
    doc.text(data.contry, 100, 60);

    doc.setPage(1)
    doc.setTextColor("black");
    doc.setFontSize(10);
    doc.text(data.city, 100, 65);


    doc.setPage(1)
    doc.setTextColor("black");
    doc.setFontSize(15);
    doc.text('Order Status is :', 15, 70);


    doc.setPage(1)
    doc.setTextColor("black");
    doc.setFontSize(10);
    doc.text(data.phase, 100, 70);


    doc.setPage(1)
    doc.setTextColor("black");
    doc.setFontSize(15);
    doc.text('Order Total is', 15, 80);

    doc.setPage(1)
    doc.setTextColor("black");
    doc.setFontSize(10);
    // doc.text(data.total, 160, 55);

    doc.setPage(1)
    doc.setTextColor("black");
    doc.setFontSize(15);
    doc.text('Shipping method :', 15, 90);


    doc.setPage(1)
    doc.setTextColor("black");
    doc.setFontSize(15);
    doc.text('Payment infomation :', 15, 100);

    // Save the PDF
    doc.save('Test.pdf');
  }

  cancelOrders() { }

  orderDetails(item) { }

  getImages(imageId) {
    if (!imageId) return '';
    return this.productService.productImageUrl(imageId);
  }

  orderCancel(id) {
    this.productService.cancelOrder(id).subscribe((products: any) => {
      alert("order canceled")
    }, (error) => {
      alert(error.error.message)
    });
  }


  onSelectedItem(i) {
    if (this.selectedIndex == i) {
      this.selectedIndex = null
    } else {
      this.selectedIndex = i
    }
  }

  scrollToTrending() {
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

  addProduct(item, productRef) {
    if (productRef) {
      let x = parseInt(productRef.innerText);
      productRef.innerText = x + 1;
    }
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

  removeProduct(item, productRef) {
    if (productRef) {
      let x = parseInt(productRef.innerText);
      if (x > 0) {
        productRef.innerText = x - 1;

        this.cartService.removeProduct(item);
      }
    }
  }
  onImageClick(index) {
    this.router.navigate(['catagory/' + this.categories[index].routeTo]);

  }
  

}
