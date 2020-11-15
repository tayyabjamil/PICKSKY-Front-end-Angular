import { OrdersProgressComponent } from './ordersProgress/ordersProgress.component';
import { AdminService } from './admin.service';

import { AddProductComponent } from './addProduct/addProduct.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextFieldComponent } from './../admin/textField/textField.component';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
@NgModule({
  imports: [CommonModule, AdminRoutingModule, FormsModule, ReactiveFormsModule,MatSelectModule,MatFormFieldModule],
  declarations: [AdminComponent, AddProductComponent, TextFieldComponent,OrdersProgressComponent],
  exports: [AdminComponent, AddProductComponent, TextFieldComponent,OrdersProgressComponent],
  providers: [AdminService],
})
export class AdminModule {}
