import { AdminService } from './admin.service';

import { AddProductComponent } from './addProduct/addProduct.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextFieldComponent } from './../admin/textField/textField.component';
@NgModule({
  imports: [CommonModule, AdminRoutingModule, FormsModule, ReactiveFormsModule],
  declarations: [AdminComponent, AddProductComponent, TextFieldComponent],
  exports: [AdminComponent, AddProductComponent, TextFieldComponent],
  providers: [AdminService],
})
export class AdminModule {}
