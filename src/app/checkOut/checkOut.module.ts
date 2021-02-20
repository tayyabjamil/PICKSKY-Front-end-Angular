import { CheckOutPageComponent } from './checkOutPage/checkOutPage.component';

import { CheckOutRoutingModule } from './checkOut-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { NgImageSliderModule } from 'ng-image-slider';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { NgxPayPalModule } from 'ngx-paypal';
import { AuthService } from '../auth.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CheckOutComponent } from './../home/checkOut/checkOut.component';
// import { AppMaterialModules } from './material.module';
import { MatSelectCountryModule } from '@angular-material-extensions/select-country';


@NgModule({
  imports: [

    CommonModule,
    FormsModule,
    CheckOutRoutingModule,
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
    MatSelectCountryModule.forRoot('de'),
  ],
  declarations: [CheckOutComponent,CheckOutPageComponent],
exports:[CheckOutComponent,CheckOutPageComponent],
  providers:[AuthService],
  schemas:[NO_ERRORS_SCHEMA ]
})
export class CheckOutModule { }
