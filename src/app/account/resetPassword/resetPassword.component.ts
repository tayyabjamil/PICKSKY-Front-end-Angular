import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../account.service';
import {patternValidator} from '../customValidator'
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
  showPass:boolean
  constructor(    public route: ActivatedRoute,private router : Router,public formBuilder:FormBuilder,public accountService:AccountService,) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");
    this.resetToken = id;
    this.showPass = true;

    this.rformPassword = this.formBuilder.group({

      newPassword: new FormControl('',  Validators.compose([
        Validators.required,
        Validators.minLength(8),

        patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        patternValidator(/[a-z]/,{ hasSmallCase: true }),
        patternValidator(/[0-9]/,{ hasDigit: true }),
      ])),
      confirmPassword: new FormControl('', [Validators.required,Validators.minLength(8)]),
      resetToken: new FormControl(this.resetToken, [Validators.required]),
    })
  }
  public passwordshow() {
    this.showPass = !this.showPass;
  }
  changePassword(){

    if(this.rformPassword.valid){
      this.accountService.resetPassword(this.rformPassword.value).subscribe(() => {

        alert("Password Reset Successful")
        this.router.navigate(['/'])

        }, (error) => {
          alert(error.error.message);
// console.log(error)
        });
    }else{
      alert("invalid form")
    }
  }
}
