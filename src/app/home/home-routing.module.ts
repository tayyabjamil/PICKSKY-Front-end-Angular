import { MyordersComponent } from './myorders/myorders.component';
import { CartComponent } from './cart/cart.component';
import { MainPageComponent } from './mainPage/mainPage.component';
import { ProductDetailComponent } from './productDetail/productDetail.component';
import { FishandmeatComponent } from './fishandmeat/fishandmeat.component';
import { OrganicComponent } from './organic/organic.component';
import { DairyComponent } from './dairy/dairy.component';
import { SnacksandbeveragesComponent } from './snacksandbeverages/snacksandbeverages.component';
import { BackeryandpasteryComponent } from './backeryandpastery/backeryandpastery.component';
import { VegetablesComponent } from './vegetables/vegetables.component';
import { AuthGuard } from './../auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
const routes: Routes = [
    { path: '', component: HomeComponent, children: [

    { path: '', component: MainPageComponent },
    { path: 'detail', component: ProductDetailComponent },
    { path: 'veg', component: VegetablesComponent },
    { path: 'organic', component: OrganicComponent },
    { path: 'dairy', component: DairyComponent },

    { path: 'cart', component: CartComponent ,canActivate:[AuthGuard]},
    { path: 'fish', component: FishandmeatComponent },
    { path: 'snacks', component: SnacksandbeveragesComponent },
    { path: 'myOrders', component: MyordersComponent, canActivate:[AuthGuard]},
    { path: 'bakery', component: BackeryandpasteryComponent },
  ]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
