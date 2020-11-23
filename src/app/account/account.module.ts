import { EmailVerifyComponent } from './../account/emailVerify/emailVerify.component';
import { ResetPasswordComponent } from './resetPassword/resetPassword.component';
import { AccountService } from './account.service';
import { TextFieldComponent } from './../account/textField/textField.component';
import { SignUpComponent } from './signUp/signUp.component';

import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import { LoginComponent } from './login/login.component';
import { AccountRoutingModule } from './account-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { NgModule,NO_ERRORS_SCHEMA } from '@angular/core';
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
    ResetPasswordComponent,
    ProfileComponent,
    EmailVerifyComponent
  ],
  exports: [
    AccountComponent,
    LoginComponent,
    SignUpComponent,
    TextFieldComponent,
    ResetPasswordComponent,
    ProfileComponent,
    EmailVerifyComponent
  ], providers: [
    AccountService
  ],
  schemas:[NO_ERRORS_SCHEMA ]
})
export class AccountModule {}
