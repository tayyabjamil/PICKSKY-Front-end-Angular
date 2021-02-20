import { OrdersProgressComponent } from './ordersProgress/ordersProgress.component';
import { AdminService } from './admin.service';

import { AddProductComponent } from './addProduct/addProduct.component';
import { NgModule,NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextFieldComponent } from './../admin/textField/textField.component';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ProductsComponent } from './products/products.component';
import { NgxPaginationModule } from 'ngx-pagination';
@NgModule({
  imports: [CommonModule, AdminRoutingModule,NgxPaginationModule, FormsModule, ReactiveFormsModule, MatSelectModule, MatFormFieldModule],
  declarations: [AdminComponent, AddProductComponent,ProductsComponent, TextFieldComponent, OrdersProgressComponent],
  exports: [AdminComponent, AddProductComponent, ProductsComponent,TextFieldComponent, OrdersProgressComponent],
  providers: [AdminService],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AdminModule {}
