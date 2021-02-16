
import { ReferFriendComponent } from './referFriend/referFriend.component';
import { GiftCardsComponent } from './giftCards/giftCards.component';

import { AboutUSComponent } from './aboutus/aboutus.component';
import { AboutusConstants } from './../appconstants';
import { TestimonalsComponent } from './testimonals/testimonals.component';
import { CatagoryComponent } from './catagory/catagory.component';

import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';
import { MyordersComponent } from './myorders/myorders.component';
import { NavComponent } from './nav/nav.component';
import { MatDialogModule } from '@angular/material/dialog';


import { HomeRoutingModule } from './home-routing.module';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { PicklesComponent } from './pickles/pickles.component';
import { TraditionalPowdersComponent } from './traditionalpowders/traditionalpowders.component';
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
import { HttpClientModule } from '@angular/common/http';
import { NgxPayPalModule } from 'ngx-paypal';
import { SupportPageComponent } from './supportPage/supportPage.component';
import { FAQComponent } from './FAQ/FAQ.component';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { MatTabsModule } from '@angular/material/tabs';
import { DiscountComponent } from './discount/discount.component';
import { BlogComponent } from './blog/blog.component';
import { PrivacyandpolicyComponent } from './privacyandpolicy/privacyandpolicy.component';
import { ReturnandrefundsComponent } from './returnandrefunds/returnandrefunds.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MainPageListItemComponent } from './mainPage-listItem/mainPage-listItem.component';
import { CustomizeComponent } from './customize/customize.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ThemeModule } from '../theme/theme.module';
// For MDB Angular Free
import { CollapseModule, WavesModule } from 'angular-bootstrap-md'
import { ToastrModule } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { OrderModule } from 'ngx-order-pipe';
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
    ReactiveFormsModule,
    MatStepperModule,
    NgxPayPalModule,
    MatTabsModule,
    MatInputModule,
    PopoverModule.forRoot(),
    MatDialogModule,
    MatCheckboxModule,
    ThemeModule,
    CollapseModule,
    WavesModule,
    ToastrModule.forRoot(),
    OrderModule,
    NgxPaginationModule,
    Ng2SearchPipeModule

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
    MyordersComponent,
    FooterComponent,
    CatagoryComponent,
    DiscountComponent,
    SupportPageComponent,
    PicklesComponent,
    TraditionalPowdersComponent,
    SpecialOffersComponent,
    OthersComponent,
    SweetandHotComponent,
    AboutUSComponent,
    FAQComponent,
    BlogComponent,
    TestimonalsComponent,
    PrivacyandpolicyComponent,
    ReturnandrefundsComponent,
    PrivacyandpolicyComponent,
    ReturnandrefundsComponent,
    GiftCardsComponent,
    ReferFriendComponent,
    MainPageListItemComponent,
    CustomizeComponent

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
    DiscountComponent,
    BlogComponent,
    FAQComponent,
    SupportPageComponent,
    AboutUSComponent,
    MyordersComponent,
    FooterComponent,
    PicklesComponent,
    TraditionalPowdersComponent,
    SpecialOffersComponent,
    OthersComponent,
    SweetandHotComponent,
    TestimonalsComponent,
    PrivacyandpolicyComponent,
    ReturnandrefundsComponent,
    GiftCardsComponent,
    ReferFriendComponent,

  ],
  schemas: [NO_ERRORS_SCHEMA]
})

export class HomeModule { }
