import { ProductDetailComponent } from './productDetail/productDetail.component';
import { FishandmeatComponent } from './fishandmeat/fishandmeat.component';
import { OrganicComponent } from './organic/organic.component';
import { DairyComponent } from './dairy/dairy.component';
import { SnacksandbeveragesComponent } from './snacksandbeverages/snacksandbeverages.component';
import { BackeryandpasteryComponent } from './backeryandpastery/backeryandpastery.component';
import { VegetablesComponent } from './vegetables/vegetables.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'detail', component: ProductDetailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'veg', component: VegetablesComponent },
  { path: 'organic', component: OrganicComponent },
  { path: 'dairy', component: DairyComponent },
  { path: 'fish', component: FishandmeatComponent },
  { path: 'snacks', component: SnacksandbeveragesComponent },
  { path: 'bakery', component: BackeryandpasteryComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
