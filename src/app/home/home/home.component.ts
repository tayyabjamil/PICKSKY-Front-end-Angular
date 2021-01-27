import { AuthService } from './../../auth.service';
import { ProductService } from '../product.service';
import { CartService } from '../cart.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AboutusConstants, HeaderConstants, PicklesConstants, SpecialConstants, SupportConstants, SweetsandHotConstants, TraditionalPodulu } from '../../appconstants';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  enableSearchProduct = '';

  cart = [];
  total;
  allProducts;
  username = ' username'
  checkOutTab = false;
  visible = false;
  constructor(public mediaObserver: MediaObserver
    , public cartService: CartService, private productService: ProductService, public authService: AuthService,
    private router: Router,
  ) { }

  mediaSub: Subscription
  deviceXs: boolean;
  deviceLg: boolean;
  deviceMd: boolean;
  deviceSm: boolean;
  search: true
  isShow:boolean
  isSHowSearch=false

  ngOnInit() {
    this.mediaSub = this.mediaObserver.media$.subscribe((result: MediaChange) => {
      console.log(result.mqAlias)
      this.deviceXs = result.mqAlias === 'xs'
      this.deviceSm = result.mqAlias === 'sm'
      this.deviceLg = result.mqAlias === 'lg'
      this.deviceMd = result.mqAlias === 'md'

    })

      console.log(this.mediaSub)


    this.getScrollingElement()
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event) {
    if (window.pageYOffset >= 80) {
      this.visible = true;
    } else {
      this.visible = false;
      this.isSHowSearch = false;

    }
  }
  toggleDisplay() {
    this.isSHowSearch = !this.isSHowSearch;
  }

  get visibleSearch() {
    return this.isSHowSearch;
  }

  get visibleI() {
    return this.visible;
  }
  getScrollingElement(): Element {
    return document.scrollingElement || document.documentElement;
  }
  get usernameLogin() {
    return this.authService.getusername()

  }
  get getCartProducts() {
    this.cart = this.cartService.getProducts();
    return this.cart;
  }
  cartPage() {
    this.router.navigate(['cart'])
    this.checkOutTab = true
  }

  checkOut() {
    this.router.navigate(['checkOut'])
    this.checkOutTab = false
  }
  get getTotal() {
    this.total = this.cartService.getTotalPrice();
    return this.total;
  }

  onLogoutClick() {
    this.authService.loggedOutName();
    this.authService.loggedOutEmail();
    this.authService.loggedOutuserId();
    this.authService.loggedOutRefrenceId();
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

  catagory(page) {
    this.router.navigate(['catagory/', page])
  }
  getHeaderNames(indx: number) { return HeaderConstants[indx]; }

  getPicklesConstants(indx: number) { return PicklesConstants[indx]; }

  getTraditionalPodulu(indx: number) { return TraditionalPodulu[indx]; }

  getSweetsandHotConstants(indx: number) { return SweetsandHotConstants[indx] }

  getSpecialConstants(indx: number) { return SpecialConstants[indx]; }

  getOthersConstants(indx: number) { return SupportConstants[indx] }

  getAboutusConstants(indx: number) { return AboutusConstants[indx] }

  getSupportConstants(indx: number) { return SupportConstants[indx] }






  getVegpickles(indx: number) { }

  getNonvegpickles(indx: number) { }

  getMasalas(indx: number) { }



  getSweets(indx: number) { }


  getHot(indx: number) { }


  getOthers(indx: number) { }


  getFAQ(indx: number) { }


  getTermsAndCondition(indx: number) { }

  getShipping(indx: number) { }


  getChat(indx: number) { }


  getBlog(indx: number) { }


  getSupport(indx: number) { }


  getPayments(indx: number) { }

  onSearchChange(searchValue: string): void {
    if (searchValue) {
      this.productService.search = true;
    } else {
      this.productService.search = false;
    }

    this.productService.setSearchItems(searchValue);
  }
}
