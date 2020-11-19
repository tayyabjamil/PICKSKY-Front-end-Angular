import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
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
constructor(private http: HttpClient,private myauthService: AuthService) { }
createuserAccount(newUser) {

  return this.http.post(
    'http://localhost:8000/api/users/'  ,
    {
      username: newUser.username,
      email: newUser.email,
      password: newUser.password,
      conatct:newUser.contact,
      accountBonus: 1

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

    },
    this.httpHeaders
  );
}
forgetPassword(){
  const email = this.myauthService.getemail()
  return this.http.post(
    'http://localhost:8000/api/users/forgetPassword/',
    {
      email
    },
    this.httpHeaders
  );
}
resetPassword(newPass){
  return this.http.post(
    'http://localhost:8000/api/users/resetPassword/',
    {
      confirmPassword: newPass.confirmPassword,
      password: newPass.newPassword,
      resetToken:newPass.resetToken
    },
    this.httpHeaders
  );
}
accountVerify(data){
  return this.http.post(
    'http://localhost:8000/api/users/accountVerify/',
    {
      token: data.accountToken,
      isVerify: data.isVerify,

    },
    this.httpHeaders
  );
}
}
