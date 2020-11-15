import { OrdersProgressComponent } from './ordersProgress/ordersProgress.component';
import { AddProductComponent } from './addProduct/addProduct.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  { path: '', component: AdminComponent, children: [

    { path: '', component: OrdersProgressComponent},

    { path: 'addProduct', component: AddProductComponent},

 ]
},
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
