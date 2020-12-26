import { Component, OnInit } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from '../cart.service';
import { ProductService } from '../product.service';
import { AboutusConstants, HeaderConstants, SpecialConstants } from '../../appconstants';
import { AdminService } from '../../admin/admin.service'


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

  getUserLocation() {
    if (!navigator.geolocation) {
      console.log("location not supported ")
    }
    navigator.geolocation.getCurrentPosition(position => {
      console.log("location supported ")
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      console.log("lat" + latitude)
      console.log("lon" + longitude)
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyAYJvPnMzFkvkeka7kw_aV4Pjn3TeeACv8`
      console.log("location not supported " + url)
      this.adminService.getlocation(url).subscribe((data: any) => {
        this.location = data.plus_code.global_code

      });

    });
  }


  watchpostion() {
    let navigation = navigator.geolocation.watchPosition(position => {
      console.log("location not supported ")
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      console.log("lat" + lat)
      console.log("lon" + lng)

      if (position.coords.latitude === lat) {
        navigator.geolocation.clearWatch(navigation);
      }
    }, (err) => {
      console.log("error" + err)
    }, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    });

  }

  getHeaderNames(indx: number) { return HeaderConstants[indx]; }

  getSpecialConstants(indx: number) { return SpecialConstants[indx]; }

  getAboutusConstants(indx: number) { return AboutusConstants[indx] }
}
