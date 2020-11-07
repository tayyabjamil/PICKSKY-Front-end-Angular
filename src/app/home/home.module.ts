import { MainPageComponent } from './mainPage/mainPage.component';
import { HomeRoutingModule } from './home-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { VegetablesComponent } from './vegetables/vegetables.component';
import { OrganicComponent } from './organic/organic.component';
import { SnacksandbeveragesComponent } from './snacksandbeverages/snacksandbeverages.component';
import { DairyComponent } from './dairy/dairy.component';
import { BackeryandpasteryComponent } from './backeryandpastery/backeryandpastery.component';
import { FishandmeatComponent } from './fishandmeat/fishandmeat.component';
import { ProductDetailComponent } from './productDetail/productDetail.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { NgImageSliderModule } from 'ng-image-slider';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgImageSliderModule,
    FlexLayoutModule,
    MatCarouselModule.forRoot(),

  ],
  declarations: [
    HomeComponent,
    VegetablesComponent,
    OrganicComponent,
    SnacksandbeveragesComponent,
    DairyComponent,
    BackeryandpasteryComponent,
    FishandmeatComponent,
    ProductDetailComponent,
    MainPageComponent
  ],
  exports:[
    HomeComponent,
    VegetablesComponent,
    OrganicComponent,
    SnacksandbeveragesComponent,
    DairyComponent,
    BackeryandpasteryComponent,
    FishandmeatComponent,
    ProductDetailComponent,
    MainPageComponent

  ]
})
export class HomeModule { }
