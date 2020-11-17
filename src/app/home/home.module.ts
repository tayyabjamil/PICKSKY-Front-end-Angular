import { FormsModule } from '@angular/forms';
import { MyordersComponent } from './myorders/myorders.component';
import { NavComponent } from './nav/nav.component';

import { MainPageComponent } from './mainPage/mainPage.component';
import { HomeRoutingModule } from './home-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { PicklesComponent } from './pickles/pickles.component';
import { TraditionalPowdersComponent } from './traditionalpowders/traditionalpowders.component';
import { SnacksandbeveragesComponent } from './snacksandbeverages/snacksandbeverages.component';
import { SpecialOffersComponent } from './specialoffers/specialoffers.component';
import { OthersComponent } from './others/others.component';
import { SweetandHotComponent } from './sweetandhot/sweetandhot.component';
import { ProductDetailComponent } from './productDetail/productDetail.component';

import { FlexLayoutModule } from '@angular/flex-layout';

import { MatCarouselModule } from '@ngmodule/material-carousel';
import { NgImageSliderModule } from 'ng-image-slider';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CartComponent } from './cart/cart.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxPayPalModule } from 'ngx-paypal';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HomeRoutingModule,
    NgImageSliderModule,
    HttpClientModule,
    FlexLayoutModule,
    MatCarouselModule.forRoot(),
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    NgxPayPalModule,

  ],
  declarations: [
    HomeComponent,
    PicklesComponent,
    TraditionalPowdersComponent,
    NavComponent,
    SnacksandbeveragesComponent,
    SpecialOffersComponent,
    OthersComponent,
    SweetandHotComponent,
    ProductDetailComponent,
    MainPageComponent,
    CartComponent,
    MyordersComponent
  ],
  exports: [
    HomeComponent,
    PicklesComponent,
    TraditionalPowdersComponent,
    NavComponent,
    SnacksandbeveragesComponent,
    SpecialOffersComponent,
    OthersComponent,
    SweetandHotComponent,
    ProductDetailComponent,
    MainPageComponent,
    CartComponent,
    MyordersComponent

  ]
})
export class HomeModule { }
