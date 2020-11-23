
import { AdminModule } from './admin/admin.module';


import { BrowserModule } from '@angular/platform-browser';
import { NgModule,NO_ERRORS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { NgImageSliderModule } from 'ng-image-slider';

import { AccountModule } from './account/account.module';
import { HomeModule } from './home/home.module';
import { AppComponent } from './app.component';

import { AuthService } from '../app/auth.service';


@NgModule({
  declarations: [
    AppComponent,
   ],
  imports: [
    BrowserModule,
    CommonModule,
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
  providers: [AuthService],
  bootstrap: [AppComponent],
  schemas:[NO_ERRORS_SCHEMA ]
})
export class AppModule { }
