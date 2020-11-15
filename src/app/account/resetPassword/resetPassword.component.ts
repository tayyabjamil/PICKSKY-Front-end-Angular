import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-resetPassword',
  templateUrl: './resetPassword.component.html',
  styleUrls: ['./resetPassword.component.css']
})
export class ResetPasswordComponent implements OnInit {
  rformPassword:FormGroup
  newPassword:String
  confirmPassword:String
  resetToken:String
  constructor(private router : Router,public formBuilder:FormBuilder,public accountService:AccountService,) { }

  ngOnInit() {
    this.rformPassword = this.formBuilder.group({

      newPassword: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
      resetToken: new FormControl('', [Validators.required]),
    })
  }
  changePassword(){
    if(this.rformPassword.valid){
      this.accountService.resetPassword(this.rformPassword.value).subscribe((data: any) => {

        alert("Login Successful")


        }, (error) => {
          alert(error.error.message);

        });
    }
  }
}
