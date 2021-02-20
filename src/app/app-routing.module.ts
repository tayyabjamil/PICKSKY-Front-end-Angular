
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'login', loadChildren: './account/account.module#AccountModule' },
  { path: 'admin', loadChildren: './admin/admin.module#AdminModule' ,canActivate: [AuthGuard]},

  { path: '', loadChildren: './home/home.module#HomeModule' },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
