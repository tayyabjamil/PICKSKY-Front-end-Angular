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

  getPhone() {
    return JSON.parse(localStorage.getItem('phone'));
  }

  getemail() {
    return JSON.parse(localStorage.getItem('email'));
  }
  getfirstName() {
    return JSON.parse(localStorage.getItem('firstName'));
  }
  getlastName() {
    return JSON.parse(localStorage.getItem('lastName'));
  }

  getRole() {
    return JSON.parse(localStorage.getItem('role'));
  }
  logOUt(){
    localStorage.clear()
  }
// loggedOutuserId() {

//   return localStorage.removeItem('userId');

// }
  // loggedOutName() {
  //   return localStorage.removeItem('username');

  // }
  // backtoCheckOut() {
  //   return localStorage.removeItem('backtoCheckOut');

  // }
  // loggedOutRefrenceId() {
  //   return localStorage.removeItem('refrenceId');

  // }

  // loggedOutRole() {
  //   return localStorage.removeItem('role');

  // }

  // loggedOutEmail() {
  //   return localStorage.removeItem('email');

  // }
}
