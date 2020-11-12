import { SignUpComponent } from './signUp/signUp.component';
import { AccountComponent } from './account.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
const routes: Routes = [
  { path: '', component: AccountComponent, children: [

  { path: 'signUp', component: SignUpComponent },

  { path: '', component: LoginComponent },

 ]
},
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
