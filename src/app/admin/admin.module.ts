
import { AddProductComponent } from './addProduct/addProduct.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
  declarations: [AdminComponent,AddProductComponent],
  exports:[AdminComponent,AddProductComponent]
})
export class AdminModule { }
