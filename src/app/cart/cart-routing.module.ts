import { CartComponent } from './cart.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  { path: 'checkOut', loadChildren: '../checkOut/checkOut.module#CheckOutModule' },
  { path: '', component: CartComponent},

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }
