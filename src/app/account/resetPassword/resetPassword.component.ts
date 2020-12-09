import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(    public route: ActivatedRoute,private router : Router,public formBuilder:FormBuilder,public accountService:AccountService,) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");
    this.resetToken = id;
    this.rformPassword = this.formBuilder.group({

      newPassword: new FormControl('', [Validators.required,Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required,Validators.minLength(8)]),
      resetToken: new FormControl(this.resetToken, [Validators.required]),
    })
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
    }
  }
}
