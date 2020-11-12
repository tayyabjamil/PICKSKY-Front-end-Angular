import { AccountService } from './account.service';
import { TextFieldComponent } from './textField/textField.component';
import { SignUpComponent } from './signUp/signUp.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import { LoginComponent } from './login/login.component';
import { AccountRoutingModule } from './account-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    AccountRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    AccountComponent,
    LoginComponent,
    SignUpComponent,
    TextFieldComponent,
  ],
  exports: [
    AccountComponent,
    LoginComponent,
    SignUpComponent,
    TextFieldComponent,
  ], providers: [
    AccountService
  ],
})
export class AccountModule {}
