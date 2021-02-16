
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { HeaderConstants, PicklesConstants, TraditionalPodulu, SweetsandHotConstants, SpecialConstants, SupportConstants, AboutusConstants } from '../../appconstants';
import { Router } from '@angular/router';

import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { AuthService } from './../../auth.service';
import { ProductService } from '../product.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(
    private breakpointObserver: BreakpointObserver, private router: Router,private authService:AuthService,
    public mediaObserver: MediaObserver,
    public productService: ProductService,
    public cartService: CartService,

  ) {

  }
  mediaSub: Subscription;
  deviceXs: boolean;
  deviceLg: boolean;
  deviceMd: boolean;
  deviceSm: boolean;

  username =" username";
  isShow = false;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  ngOnInit() {
    // this.username=this.authService.getusername()
    this.mediaSub = this.mediaObserver.media$.subscribe(
      (result: MediaChange) => {
        console.log(result.mqAlias);
        this.deviceXs = result.mqAlias === 'xs';
        this.deviceSm = result.mqAlias === 'sm';
        this.deviceLg = result.mqAlias === 'lg';
        this.deviceMd = result.mqAlias === 'md';
      }
    );

  }
  get usernameLogin(){
    return this.authService.getusername()

  }
  toggleDisplay() {
    this.isShow = !this.isShow;
  }
  catagory(page){
    this.router.navigate(['catagory/', page])
     }
     onSearchChange(searchValue: string): void {
      if (searchValue) {
        this.productService.search = true;
      } else {
        this.productService.search = false;
      }

      this.productService.setSearchItems(searchValue);
    }
  getHeaderNames(indx: number) { return HeaderConstants[indx]; }

  getPicklesConstants(indx: number) { return PicklesConstants[indx]; }

  getTraditionalPodulu(indx: number) { return TraditionalPodulu[indx]; }

  getSweetsandHotConstants(indx: number) { return SweetsandHotConstants[indx] }

  getSpecialConstants(indx: number) { return SpecialConstants[indx]; }

  getOthersConstants(indx: number) { return SupportConstants[indx] }

  getAboutusConstants(indx: number) { return AboutusConstants[indx] }

  getSupportConstants(indx: number) { return SupportConstants[indx] }

  onLogoutClick() {
    this.authService.loggedOutName();
    this.authService.loggedOutEmail();
    this.authService.loggedOutuserId();
    this.authService.loggedOutRefrenceId();
  }
}
