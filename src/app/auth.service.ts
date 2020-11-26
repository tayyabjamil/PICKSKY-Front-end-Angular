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
  getRefrenceId() {
    return JSON.parse(localStorage.getItem('refrenceId'));
  }
  getContact() {
    return JSON.parse(localStorage.getItem('contact'));
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
  loggedOutContact() {
    return localStorage.removeItem('contact');

  }
}
