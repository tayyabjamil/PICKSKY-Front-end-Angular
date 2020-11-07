import { NavComponent } from './home/nav/nav.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'login', loadChildren: './account/account.module#AccountModule' },
  { path: '', loadChildren: './home/home.module#HomeModule' },
  // { path: '', component:NavComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
