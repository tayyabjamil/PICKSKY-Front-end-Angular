
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';
import { MyordersComponent } from './myorders/myorders.component';
import { NavComponent } from './nav/nav.component';


import { HomeRoutingModule } from './home-routing.module';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { PicklesComponent } from './Pickles/Pickles.component';
import { TraditionalPowdersComponent } from './TraditionalPowders/TraditionalPowders.component';
import { SweetandHotComponent } from './sweetandhot/sweetandhot.component';
import { DairyComponent } from './dairy/dairy.component';
import { OthersComponent } from './others/others.component';
import { SpecialOffersComponent } from './specialoffers/specialoffers.component';
import { ProductDetailComponent } from './productDetail/productDetail.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MainPageComponent } from './mainPage/mainPage.component';
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
import { SupportPageComponent } from './supportPage/supportPage.component';


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
    SweetandHotComponent,
    DairyComponent,
    OthersComponent,
    SpecialOffersComponent,
    ProductDetailComponent,
    MainPageComponent,
    CartComponent,
    MyordersComponent,
    FooterComponent,
    //  SupportPageComponent,
    PicklesComponent,
    TraditionalPowdersComponent,
    SpecialOffersComponent,
    OthersComponent,
    SweetandHotComponent,
  ],
  exports: [
    HomeComponent,
    PicklesComponent,
    TraditionalPowdersComponent,
    NavComponent,
    SweetandHotComponent,
    DairyComponent,
    OthersComponent,
    SpecialOffersComponent,
    ProductDetailComponent,
    MainPageComponent,
    CartComponent,
    // SupportPageComponent,
    MyordersComponent,
    FooterComponent,
    PicklesComponent,
    TraditionalPowdersComponent,
    SpecialOffersComponent,
    OthersComponent,
    SweetandHotComponent,
  ],
  schemas: [NO_ERRORS_SCHEMA]
})

export class HomeModule { }