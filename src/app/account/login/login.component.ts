import { FormGroup,FormControl,Validators,FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
   rformLogin:FormGroup
   email:String
   password:String
  constructor(private router : Router,public formBuilder:FormBuilder,public accountService:AccountService,) { }

  ngOnInit() {
    this.rformLogin = this.formBuilder.group({

      email: new FormControl('', [Validators.required,Validators.email]),
      password: new FormControl('', [Validators.required]),
    })
  }
public createAccount(){
this.router.navigate(['/signUp'])
}
login(){
  if(this.rformLogin.valid){
    this.accountService.login(this.rformLogin.value).subscribe((data: any) => {
      alert("Login Successful")
      this.router.navigate(['/home'])

      }, (error) => {
        alert(error.error.message);

      });
  }
}
}
