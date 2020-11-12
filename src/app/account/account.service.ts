import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
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
constructor(private http: HttpClient) { }
createuserAccount(newUser) {

  return this.http.post(
    'http://localhost:8000/api/user/createAccount',
    {
      username: newUser.username,
      email: newUser.email,
      password: newUser.password,
      conatct:newUser.contact

    },
    this.httpHeaders
  );
}
login(user) {

  return this.http.post(
    'http://localhost:8000/api/user/login',
    {
      email: user.email,
      password: user.password,

    },
    this.httpHeaders
  );
}
}
