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
@NgModule({
  declarations: [
    AppComponent,
      HomeComponent
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
