import { MyordersComponent } from './myorders/myorders.component';
import { CartComponent } from './cart/cart.component';
import { MainPageComponent } from './mainPage/mainPage.component';
import { ProductDetailComponent } from './productDetail/productDetail.component';
import { SweetandHotComponent } from './sweetandhot/sweetandhot.component';
import { TraditionalPowdersComponent } from './traditionalpowders/traditionalpowders.component';
import { SpecialOffersComponent } from './specialoffers/specialoffers.component';
import { SnacksandbeveragesComponent } from './snacksandbeverages/snacksandbeverages.component';
import { OthersComponent } from './others/others.component';
import { PicklesComponent } from './pickles/pickles.component';
import { AuthGuard } from './../auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { AboutUSComponent } from './aboutus/aboutus.component';
import { SupportComponent } from './support/support.component';
const routes: Routes = [
  {
    path: '', component: HomeComponent, children: [

      { path: '', component: MainPageComponent },
      { path: 'pickles', component: PicklesComponent },
      { path: 'traditionalpowders', component: TraditionalPowdersComponent },
      { path: 'sweets', component: SweetandHotComponent },
      { path: 'specialoffers', component: SpecialOffersComponent },
      { path: 'others', component: OthersComponent },

      { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
      { path: 'snacks', component: SnacksandbeveragesComponent },
      { path: 'myOrders', component: MyordersComponent, canActivate: [AuthGuard] },
      { path: 'aboutus', component: AboutUSComponent },
      { path: 'support', component: SupportComponent },



      { path: 'detail', component: ProductDetailComponent },

      { path: 'cart', component: CartComponent },
      { path: 'snacks', component: SnacksandbeveragesComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
