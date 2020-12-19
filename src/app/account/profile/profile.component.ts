
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
  rformEditPassword: FormGroup;
contact;
  constructor(public formBuilder: FormBuilder, public accountService: AccountService, private router: Router, public http: HttpClient, private myauthService: AuthService) { }

  ngOnInit() {
     this.username = this.myauthService.getusername();
     this.email = this.myauthService.getemail();
     this.refrenceId = this.myauthService.getRefrenceId();



     this.rformEdit = this.formBuilder.group({
    username: new FormControl(this.username ),
    email: new FormControl(this.email, Validators.email),

    contact: new FormControl(this.contact )
  });
  // tslint:disable-next-line: align
  this.rformEditPassword = this.formBuilder.group({
    oldPassword: new FormControl('' ),
    newPassword: new FormControl(''),

  });
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
