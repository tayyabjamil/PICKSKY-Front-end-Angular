import { OrdersProgressComponent } from './ordersProgress/ordersProgress.component';
import { AddProductComponent } from './addProduct/addProduct.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  { path: '', component: AdminComponent, children: [
    { path: 'products', component: ProductsComponent},
    { path: 'addProduct', component: AddProductComponent},
    { path: 'addProduct/:id', component: AddProductComponent},
    { path: '', component: OrdersProgressComponent},
 ]
},
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
