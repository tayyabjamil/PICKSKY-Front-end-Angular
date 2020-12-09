import { FormGroup,FormControl,Validators,FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';
import  {MediaObserver, MediaChange} from '@angular/flex-layout';
import  { Subscription } from 'rxjs';
import { SocialAuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import {
  GoogleLoginProvider,
  FacebookLoginProvider,
} from 'angularx-social-login';
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


  constructor(

    public mediaObserver:MediaObserver,
    private router : Router,
    public formBuilder:FormBuilder,
    public accountService:AccountService,private authService: SocialAuthService,) { }
  mediaSub:Subscription
  deviceXs:boolean;
  deviceLg:boolean;
  deviceMd:boolean;
  deviceSm:boolean;
  show: boolean;
  ngOnInit() {
    this.mediaSub = this.mediaObserver.media$.subscribe((result:MediaChange)=>{
      console.log(result.mqAlias)
      this.deviceXs = result.mqAlias === 'xs'
      this.deviceSm = result.mqAlias ==='sm'
      this.deviceLg = result.mqAlias === 'lg'
      this.deviceMd = result.mqAlias === 'md'
      this.show = false;
    })

    this.rformLogin = this.formBuilder.group({

      email: new FormControl('', [Validators.required,Validators.email]),
      password: new FormControl('', [Validators.required,Validators.minLength(8)]),
    })
   }

public createAccount(){
this.router.navigate(['/signUp'])
}
public passwordshow() {
  this.show = !this.show;
}

login(){
  if(this.rformLogin.valid){
    this.accountService.login(this.rformLogin.value).subscribe((data: any) => {

      alert("Login Successful")

      this.setId(data.userId);
      this.setusername(data.username);
      this.setemail(data.email)
      this.setcontact(data.contact)
      this.setRefrenceId(data.refrenceId)
      this.isLoggedIn = true;
      this.router.navigate(['/'])

      }, (error) => {
        alert(error.error.message);

      });
  }
}
forgetPassword(){
      this.router.navigate(['/forgetPassword'])
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
setcontact(contact) {
  localStorage.setItem('contact', JSON.stringify(contact));
}
setemail(email) {
  localStorage.setItem('email', JSON.stringify(email));
}

signInGoogle(platform: string) {
  platform = GoogleLoginProvider.PROVIDER_ID;
  this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
    .then((Response) => {
      console.log(platform + 'logged in user is ', Response);

      const userAccount = {
        email: Response.email,
        username: Response.name,
        contact:Response.provider,
        provider:Response.provider,

        password: Response.id,
      };
      this.accountService.signIn(userAccount).subscribe((data: any) => {

        alert('login successfull')

        this.setId(data.userId);
        this.setusername(data.username);
        this.setemail(data.email)
        this.setcontact(data.contact)
        this.setRefrenceId(data.refrenceId)
        this.isLoggedIn = true;
    // this.router.navigate(['/'])




        }, (error) => {
          if(error.error.message){
            this.socailLogin(userAccount)
            }else{
              alert("Login Failed")
            }


        });
      });

}
signInFacebook(platform: string) {
  platform = FacebookLoginProvider.PROVIDER_ID;
  this.authService
    .signIn(FacebookLoginProvider.PROVIDER_ID)
    .then((Response) => {
      console.log(platform + 'logged in user is ', Response);
      // tslint:disable-next-line: no-unused-expression
      const userAccount = {
        email: Response.name,
        username: Response.firstName,
        password: Response.id,
        token: Response.authToken,
      };

      this.accountService.signIn(userAccount).subscribe((data: any) => {

        alert('login successfull')

        this.setId(data.userId);
        this.setusername(data.username);
        this.setemail(data.email)
        this.setcontact(data.contact)
        this.setRefrenceId(data.refrenceId)
        this.isLoggedIn = true;





        }, (error) => {
          if(error.error.message){
            this.socailLogin(userAccount)
            }else{
              alert("Login Failed")
            }


        });
      });


}
socailLogin(userAccount){
  this.accountService.login(userAccount).subscribe((data: any) => {

    alert("Login Successful")
    this.setId(data.userId);
    this.setusername(data.username);
    this.setemail(data.email)
    this.setcontact(data.contact)
    this.setRefrenceId(data.refrenceId)
    this.isLoggedIn = true;
    this.router.navigate(['/'])

    }, (error) => {
      alert(error.error.message);

    });
  }
}
