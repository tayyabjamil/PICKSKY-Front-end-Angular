
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { FormBuilder, FormGroup, FormControl , Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  username;
  email;
  refrenceId;
  rformEdit: FormGroup;
  phone;
  rformEditPassword: FormGroup;
contact;
showPassword:boolean
adress1:''
adress2:''
showOld:boolean
  constructor(public formBuilder: FormBuilder, public accountService: AccountService, private router: Router, public http: HttpClient, private myauthService: AuthService) { }

  ngOnInit() {
     this.username = this.myauthService.getusername();
     this.email = this.myauthService.getemail();
     this.phone = this.myauthService.getPhone()

     this.rformEdit = this.formBuilder.group({
    username: new FormControl(this.username ),
    email: new FormControl(this.email, Validators.email),

    contact: new FormControl(this.phone),
    state: new FormControl(''),
    appartment: new FormControl(''),
  });
  this.rformEditPassword = this.formBuilder.group({
    oldPassword: new FormControl('' ),
    newPassword: new FormControl(''),

  });
}
public passwordshow() {
  this.showPassword = !this.showPassword;
  console.log(this.showPassword)
}
public passwordshowOld() {
  this.showOld = !this.showOld;
  console.log(this.showPassword)

}
editInfo(){

 this.accountService.editInfo(this.rformEdit.value).subscribe((data: any) => {
  alert("Edited")
  this.setusername(data.username);
  this.setemail(data.email)
  }, (error) => {
    alert(error.error.message);

  });
}
editPassowrd(){

  this.accountService.editPassword(this.rformEditPassword.value).subscribe((data: any) => {
   alert("Edited")

   }, (error) => {
     alert(error.error.message);

   });
 }
setusername(username) {
  localStorage.setItem('username', JSON.stringify(username));
}
setemail(email) {
  localStorage.setItem('email', JSON.stringify(email));
}
}
