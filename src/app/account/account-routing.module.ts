import { ResetPasswordComponent } from './resetPassword/resetPassword.component';
import { SignUpComponent } from './signUp/signUp.component';
import { AccountComponent } from './account.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
const routes: Routes = [
  { path: '', component: AccountComponent, children: [
    { path: 'resetPassword', component: ResetPasswordComponent },
  { path: 'signUp', component: SignUpComponent },
  // { path: 'home', loadChildren: './home/home.module#HomeModule' },
  { path: '', component: LoginComponent },

 ]
},
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
