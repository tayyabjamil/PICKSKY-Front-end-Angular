import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  httpHeaders = {
    headers: new HttpHeaders({
      'Content-Type': 'Application/Json',
      accept: ' application/json'
    })
  };
  constructor(private http: HttpClient, private myauthService: AuthService,) { }

  createuserAccount(newUser) {

    return this.http.post(
      'http://localhost:8000/api/users/',
      {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        password: newUser.password,
        phone: newUser.phone,
        accountBonus: 1,
        provider: newUser.provider,
        token: newUser.token

      },
      this.httpHeaders
    );
  }
  signUp(newUser) {

    return this.http.post(
      'http://localhost:8000/api/users/signUpSocial',
      {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        password: newUser.password,
        contact: newUser.contact,
        accountBonus: 1,
        provider: newUser.provider,
        token: newUser.token

      },
      this.httpHeaders
    );
  }
  signIn(newUser) {

    return this.http.post(
      'http://localhost:8000/api/users/signInSocial',
      {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        password: newUser.password,
        contact: newUser.contact,
        accountBonus: 1,
        provider: newUser.provider,
        token: newUser.token

      },
      this.httpHeaders
    );
  }
  login(user) {

    return this.http.post(
      'http://localhost:8000/api/users/login',
      {
        email: user.email,
        password: user.password,
        idToken: user.idToken,
        provider: user.provider

      },
      this.httpHeaders
    );
  }
  forgetPassword(data) {
    // const email = this.myauthService.getemail()
    return this.http.post(
      'http://localhost:8000/api/users/forgetPassword/',
      {
        email: data.email
      },
      this.httpHeaders
    );
  }
  resetPassword(newPass) {
    return this.http.post(
      'http://localhost:8000/api/users/resetPassword/',
      {
        confirmPassword: newPass.confirmPassword,
        password: newPass.newPassword,
        resetToken: newPass.resetToken
      },
      this.httpHeaders
    );
  }
  accountVerify(data) {
    return this.http.post(
      'http://localhost:8000/api/users/accountVerify/',
      {
        token: data.accountToken,
        isVerify: data.isVerify,

      },
      this.httpHeaders
    );
  }
  editInfo(data) {
    return this.http.post(
      'http://localhost:8000/api/users/editInfo/',
      {
        userId: this.myauthService.getID(),
        username: data.username,
        email: data.email,
        contact: data.contact,


      },
      this.httpHeaders
    );

  }
  editPassword(data) {
    return this.http.post(
      'http://localhost:8000/api/users/editPassword/',
      {
        userId: this.myauthService.getID(),
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,

      },
      this.httpHeaders
    );

  }
}
