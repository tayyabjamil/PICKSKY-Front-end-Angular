import { AuthGuard } from './../auth.guard';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckOutComponent } from '../home/checkOut/checkOut.component';
import { CheckOutPageComponent } from './checkOutPage/checkOutPage.component';
const routes: Routes = [


  {
    path: '', component: CheckOutComponent ,canActivate:[AuthGuard] , children: [



      { path: '', component: CheckOutPageComponent },
      { path: 'login', loadChildren: './account/account.module#AccountModule' },

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckOutRoutingModule { }
