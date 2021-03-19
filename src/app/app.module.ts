import { CartModule } from './cart/cart.module';
import { CheckOutModule } from './checkOut/checkOut.module';

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
import { ModalModule } from 'ngx-bootstrap/modal';

import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';
import { RouterModule } from '@angular/router';
import { FacebookModule } from 'ngx-facebook';
import { ProductService } from './home/product.service';
const googleid = '' ;
const facebookid = '2702502043208538';

@NgModule({
  declarations: [
    AppComponent,
   ],
  imports: [
    BrowserModule,
    CommonModule,
    ModalModule.forRoot(),
    AppRoutingModule,
    NgImageSliderModule,
    CommonModule,
    FlexLayoutModule,
    HomeModule,
    CheckOutModule,
    AdminModule,
    AccountModule,
    CartModule,
    BrowserAnimationsModule,
    SocialLoginModule,
    FacebookModule.forRoot(),
    MatCarouselModule.forRoot(),


  ],
  providers: [AuthService, ProductService,{
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            '572390913824-bm7m30cl9kdl89kdbp00mhnl92jh91ae.apps.googleusercontent.com'
          )
        },
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider('1162828197469396')
        }
      ]
    } as SocialAuthServiceConfig,
  }],
  bootstrap: [AppComponent],
  schemas:[NO_ERRORS_SCHEMA ]
})
export class AppModule { }
