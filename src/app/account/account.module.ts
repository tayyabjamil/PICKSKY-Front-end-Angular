import { SignUpComponent } from './signUp/signUp.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import { LoginComponent } from './login/login.component';
import { AccountRoutingModule } from './account-routing.module';

@NgModule({
  imports: [CommonModule, AccountRoutingModule],
  declarations: [AccountComponent, LoginComponent,SignUpComponent],
  exports: [AccountComponent, LoginComponent,SignUpComponent],
})
export class AccountModule {}
