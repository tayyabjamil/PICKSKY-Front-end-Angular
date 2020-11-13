import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  httpHeaders = {
    headers: new HttpHeaders({
      'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
      accept: '*/*',
      Authorization: `Bearer auth-token`
    })
  };
constructor(private http: HttpClient) { }

  addProducts(fd) {
    return this.http.post(
      'http://localhost:8000/api/products/', fd
    );
  }

}

