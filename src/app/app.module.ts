
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { NgImageSliderModule } from 'ng-image-slider';

import { VegetablesComponent } from './vegetables/vegetables.component';
import { OrganicComponent } from './organic/organic.component';
import { SnacksandbeveragesComponent } from './snacksandbeverages/snacksandbeverages.component';
import { DairyComponent } from './dairy/dairy.component';
import { BackeryandpasteryComponent } from './backeryandpastery/backeryandpastery.component';
import { FishandmeatComponent } from './fishandmeat/fishandmeat.component';
import { ProductDetailComponent } from './productDetail/productDetail.component';


@NgModule({
  declarations: [	
    AppComponent,
      HomeComponent,

      VegetablesComponent,
      OrganicComponent,
      SnacksandbeveragesComponent,
      DairyComponent,
      BackeryandpasteryComponent,
      FishandmeatComponent,
      ProductDetailComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgImageSliderModule,
    CommonModule,
    FlexLayoutModule,

    BrowserAnimationsModule,
    MatCarouselModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
