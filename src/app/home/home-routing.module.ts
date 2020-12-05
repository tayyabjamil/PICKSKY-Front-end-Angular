import { FAQComponent } from './FAQ/FAQ.component';
import { BlogComponent } from './blog/blog.component';
import { TestimonalsComponent } from './testimonals/testimonals.component';
import { DiscountComponent } from './discount/discount.component';
import { CatagoryComponent } from './catagory/catagory.component';
import { SupportPageComponent } from './supportPage/supportPage.component';
import { FooterComponent } from './footer/footer.component';
import { MyordersComponent } from './myorders/myorders.component';
import { CartComponent } from './cart/cart.component';
import { MainPageComponent } from './mainPage/mainPage.component';
import { ProductDetailComponent } from './productDetail/productDetail.component';
import { SpecialOffersComponent } from './specialoffers/specialoffers.component';
import { TraditionalPowdersComponent } from './TraditionalPowders/TraditionalPowders.component';
import { SweetandHotComponent } from './sweetandhot/sweetandhot.component';
import { OthersComponent } from './others/others.component';
import { PicklesComponent } from './Pickles/Pickles.component';
import { AboutUSComponent } from './aboutus/aboutus.component';
import { SupportComponent } from './support/support.component';
import { PrivacyandpolicyComponent } from './privacyandpolicy/privacyandpolicy.component';
import { ReturnandrefundsComponent } from './returnandrefunds/returnandrefunds.component';
import { AuthGuard } from './../auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
const routes: Routes = [
  {
    path: '', component: HomeComponent, children: [


      { path: 'detail', component: ProductDetailComponent },
      { path: 'pickles', component: PicklesComponent },
      { path: 'powders', component: TraditionalPowdersComponent },
      { path: 'sweets', component: SweetandHotComponent },
      { path: 'specialoffers', component: SpecialOffersComponent },
      { path: 'others', component: OthersComponent },
      { path: 'discount/:username', component: DiscountComponent },
      { path: 'catagory/:page', component: CatagoryComponent },
      { path: 'aboutUs', component: AboutUSComponent },
      { path: 'testimonals', component: TestimonalsComponent },
      { path: 'faq', component: FAQComponent },
      { path: 'privacy', component: PrivacyandpolicyComponent },
      { path: 'returns', component: ReturnandrefundsComponent },
      // { path: 'support', component: SupportPageComponent },
      { path: 'supportpage', component: SupportPageComponent },
      { path: 'blog', component: BlogComponent },
      { path: 'home', component: HomeComponent },
      { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
      { path: 'myOrders', component: MyordersComponent, canActivate: [AuthGuard] },
      { path: '', component: MainPageComponent },

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
