import { FormGroup,FormControl,Validators,FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';
import  {MediaObserver, MediaChange} from '@angular/flex-layout';
import  { Subscription } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
   rformLogin:FormGroup
   isLoggedIn = true;
   email:String
   password:String

  constructor(public mediaObserver:MediaObserver,private router : Router,public formBuilder:FormBuilder,public accountService:AccountService,) { }
  mediaSub:Subscription
  deviceXs:boolean;
  deviceLg:boolean;
  deviceMd:boolean;
  deviceSm:boolean;

  ngOnInit() {
    this.mediaSub = this.mediaObserver.media$.subscribe((result:MediaChange)=>{
      console.log(result.mqAlias)
      this.deviceXs = result.mqAlias === 'xs'
      this.deviceSm = result.mqAlias ==='sm'
      this.deviceLg = result.mqAlias === 'lg'
      this.deviceMd = result.mqAlias === 'md'

    })
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
      this.setId(data.userId);
      this.setusername(data.username);
      this.setemail(data.email)
      this.setRefrenceId(data.refrenceId)
      this.isLoggedIn = true;
      // this.router.navigate(['/home'])

      }, (error) => {
        alert(error.error.message);

      });
  }
}
setId(userId) {
  localStorage.setItem('userId', JSON.stringify(userId));
}
setRefrenceId(refrenceId) {
  localStorage.setItem('refrenceId', JSON.stringify(refrenceId));
}
setusername(username) {
  localStorage.setItem('username', JSON.stringify(username));
}
setemail(email) {
  localStorage.setItem('email', JSON.stringify(email));
}
reset(){
  this.accountService.forgetPassword().subscribe((data) => {
    alert("Mail send to your gmail")


    }, (error) => {
      alert(error.error.message);

    });

}
}
