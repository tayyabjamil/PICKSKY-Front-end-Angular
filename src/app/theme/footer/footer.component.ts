import { Component, OnInit } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AboutusConstants, HeaderConstants, SpecialConstants } from '../../appconstants';
import { AdminService } from '../../admin/admin.service'
import { CartService } from 'src/app/home/cart.service';
import { ProductService } from 'src/app/home/product.service';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  location:any

  constructor(
    public mediaObserver: MediaObserver,
    public productService: ProductService,
    public cartService: CartService,
    private router: Router,
    public adminService: AdminService
  ) {

  }
  mediaSub: Subscription;
  deviceXs: boolean;
  deviceLg: boolean;
  deviceMd: boolean;
  deviceSm: boolean;



  ngOnInit() {
    this.getlocation()
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

  watchpostion(): Promise<any> {
    return new Promise((reslove, reject) => {
       window.navigator.geolocation.watchPosition(position => {
        reslove({ latitude: position.coords.latitude, longitude: position.coords.longitude})
      }, (err) => {
          reject("error" + err)
      }, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      });
    });

  }

  getlocation() {
    this.watchpostion().then(resp => {
      this.adminService.getlocation(resp.latitude, resp.longitude).subscribe((data: any) => {
        // let value = data.plus_code.compound_code
        // console.log("lat " + value)
      });
    }, (err) => {
      console.log("error" + err)
    });
  }

  getHeaderNames(indx: number) { return HeaderConstants[indx]; }

  getSpecialConstants(indx: number) { return SpecialConstants[indx]; }

  getAboutusConstants(indx: number) { return AboutusConstants[indx] }
}
