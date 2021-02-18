import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { environment } from '../../environments/environment';



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
      `${environment.apiURL}${environment.SHRIVASA_FOODS_USER_API}`,
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
      `${environment.apiURL}${environment.SHRIVASA_FOODS_USER_API}` +'/signUpSocial',
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
      `${environment.apiURL}${environment.SHRIVASA_FOODS_USER_API}`+'/signInSocial',
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
      `${environment.apiURL}${environment.SHRIVASA_FOODS_USER_API}`+'/login',
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
      `${environment.apiURL}${environment.SHRIVASA_FOODS_USER_API}` +'/forgetPassword/',
      {
        email: data.email
      },
      this.httpHeaders
    );
  }
  resetPassword(newPass) {
    return this.http.post(
      `${environment.apiURL}${environment.SHRIVASA_FOODS_USER_API}`+'/resetPassword/',
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
      `${environment.apiURL}${environment.SHRIVASA_FOODS_USER_API}`+'/accountVerify/',
      {
        token: data.accountToken,
        isVerify: data.isVerify,

      },
      this.httpHeaders
    );
  }
  editInfo(data) {
    return this.http.post(
      `${environment.apiURL}${environment.SHRIVASA_FOODS_USER_API}`+'/editInfo/',
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
      `${environment.apiURL}${environment.SHRIVASA_FOODS_USER_API}`+'/editPassword/',
      {
        userId: this.myauthService.getID(),
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,

      },
      this.httpHeaders
    );

  }
}
