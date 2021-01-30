import { ForgetPasswordComponent } from './forgetPassword/forgetPassword.component';
import { EmailVerifyComponent } from './../account/emailVerify/emailVerify.component';
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
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { ResetPasswordComponent } from './resetPassword/resetPassword.component';

@NgModule({
  imports: [
    CommonModule,
    AccountRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatInputModule,
    MatToolbarModule,
    NgxIntlTelInputModule
  ],
  declarations: [
    AccountComponent,
    LoginComponent,
    SignUpComponent,
    TextFieldComponent,
    ResetPasswordComponent,
    ProfileComponent,
    EmailVerifyComponent,
    ForgetPasswordComponent
  ],
  exports: [
    AccountComponent,
    LoginComponent,
    SignUpComponent,
    TextFieldComponent,
    ResetPasswordComponent,
    ProfileComponent,
    EmailVerifyComponent,
    ForgetPasswordComponent
  ], providers: [
    AccountService,
  ],
  schemas:[NO_ERRORS_SCHEMA ]
})
export class AccountModule {}
