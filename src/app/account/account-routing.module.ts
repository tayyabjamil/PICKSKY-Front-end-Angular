import { ForgetPasswordComponent } from './forgetPassword/forgetPassword.component';
import { EmailVerifyComponent } from './../account/emailVerify/emailVerify.component';
import { ProfileComponent } from './profile/profile.component';
import { ResetPasswordComponent } from './resetPassword/resetPassword.component';
import { SignUpComponent } from './signUp/signUp.component';
import { AccountComponent } from './account.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuardLoggedIn } from '../authGuardLoggedIn';
const routes: Routes = [
  { path: 'checkOut', loadChildren: '../checkOut/checkOut.module#CheckOutModule' },
  {
    path: '', component: AccountComponent, children: [
      { path: 'resetPassword/:id', component: ResetPasswordComponent },
      { path: 'signUp', component: SignUpComponent,canActivate:[AuthGuardLoggedIn]},
      { path: 'profile', component: ProfileComponent },
      { path: 'forgetPassword', component: ForgetPasswordComponent },
      { path: 'accountVerify/:token', component: EmailVerifyComponent },

      // { path: '', loadChildren: './home/home.module#HomeModule' },
      { path: 'login', component: LoginComponent },

      { path: '', component: LoginComponent ,canActivate:[AuthGuardLoggedIn]},

    ]
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
