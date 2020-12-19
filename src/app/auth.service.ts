import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor() { }
loggedIn() {
  return !!localStorage.getItem('userId');
}

getID() {
  return JSON.parse(localStorage.getItem('userId'));
}
  getusername() {
    if(localStorage.getItem('username'))
    {
    return JSON.parse(localStorage.getItem('username'));
  }
}
  getRefrenceId() {
    return JSON.parse(localStorage.getItem('refrenceId'));
  }

  getemail() {
    return JSON.parse(localStorage.getItem('email'));
  }
loggedOutuserId() {

  return localStorage.removeItem('userId');

}
  loggedOutName() {
    return localStorage.removeItem('username');

  }
  loggedOutRefrenceId() {
    return localStorage.removeItem('refrenceId');

  }
  loggedOutEmail() {
    return localStorage.removeItem('email');

  }

}
