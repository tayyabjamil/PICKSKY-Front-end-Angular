import { FormsModule } from '@angular/forms';
import { MyordersComponent } from './myorders/myorders.component';
import { NavComponent } from './nav/nav.component';

import { MainPageComponent } from './mainPage/mainPage.component';
import { HomeRoutingModule } from './home-routing.module';
import { NgModule ,NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { VegetablesComponent } from './vegetables/vegetables.component';
import { OrganicComponent } from './organic/organic.component';
import { SnacksandbeveragesComponent } from './snacksandbeverages/snacksandbeverages.component';
import { DairyComponent } from './dairy/dairy.component';
import { BackeryandpasteryComponent } from './backeryandpastery/backeryandpastery.component';
import { FishandmeatComponent } from './fishandmeat/fishandmeat.component';
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
import { BrowserModule } from '@angular/platform-browser'
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

    VegetablesComponent,
    OrganicComponent,
    NavComponent,
    SnacksandbeveragesComponent,
    DairyComponent,
    BackeryandpasteryComponent,
    FishandmeatComponent,
    ProductDetailComponent,
    MainPageComponent,
    CartComponent,
    MyordersComponent,
    HomeComponent

  ],
  exports:[
    HomeComponent,
    VegetablesComponent,
    OrganicComponent,
    NavComponent,
    SnacksandbeveragesComponent,
    DairyComponent,
    BackeryandpasteryComponent,
    FishandmeatComponent,
    ProductDetailComponent,
    MainPageComponent,
    CartComponent,
    MyordersComponent

  ],
  schemas:[NO_ERRORS_SCHEMA]
})
export class HomeModule { }
