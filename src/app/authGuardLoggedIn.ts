import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../app/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardLoggedIn implements CanActivate {
  constructor(private  _authService: AuthService,private router: Router) {

  }
  canActivate(): boolean {
    if (this._authService.loggedIn()) {
      alert('not allowed after login');
      this.router.navigate([''])
      return false;
    } else {
      return true;


}
  }

  }

