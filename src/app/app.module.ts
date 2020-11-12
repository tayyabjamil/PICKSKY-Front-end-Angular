import { AdminModule } from './admin/admin.module';


import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { NgImageSliderModule } from 'ng-image-slider';

import { AccountModule } from './account/account.module';
import { HomeModule } from './home/home.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgImageSliderModule,
    CommonModule,
    FlexLayoutModule,
    HomeModule,
AdminModule,
    AccountModule,
    BrowserAnimationsModule,
    MatCarouselModule.forRoot(),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
