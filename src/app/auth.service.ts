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
    return JSON.parse(localStorage.getItem('username'));
  }
  getemail() {
    return JSON.parse(localStorage.getItem('email'));
  }
loggedOut() {

  return localStorage.removeItem('userId');

}
  loggedOutName() {
    return localStorage.removeItem('username');

  }

}
