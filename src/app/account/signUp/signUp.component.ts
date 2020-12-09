import { Router } from '@angular/router';
import { AccountService } from './../account.service';
import { FormBuilder, FormGroup,FormControl ,Validators} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { SocialAuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import  {MediaObserver, MediaChange} from '@angular/flex-layout';
import  { Subscription } from 'rxjs';
import {
  GoogleLoginProvider,
  FacebookLoginProvider,
} from 'angularx-social-login';
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-signUp',
  templateUrl: './signUp.component.html',
  styleUrls: ['./signUp.component.scss']
})
export class SignUpComponent implements OnInit {
  rformSignup:FormGroup
  username:string
  email:string
  password:string
  contact:number
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
 isLoggedIn = true;
  ngOnInit() {
    this.mediaSub = this.mediaObserver.media$.subscribe((result:MediaChange)=>{
      console.log(result.mqAlias)
      this.deviceXs = result.mqAlias === 'xs'
      this.deviceSm = result.mqAlias ==='sm'
      this.deviceLg = result.mqAlias === 'lg'
      this.deviceMd = result.mqAlias === 'md'
    })
      this.show = false;
    this.rformSignup = this.formBuilder.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required,Validators.email]),
      password: new FormControl('', [Validators.required,Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required,Validators.minLength(8)]),
    })
  }
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
  signOut(): void {
    this.authService.signOut();
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

createAccount(){
  if(this.rformSignup.valid){
    if(this.rformSignup.value.password === this.rformSignup.value.confirmPassword){
 this.accountService.createuserAccount(this.rformSignup.value).subscribe((data: any) => {
  alert("Account Created")
  this.router.navigate(['/login'])

  }, (error) => {
    alert(error.error.message);

  });
  }else{
alert("Password not match")
  }
}
  else{
    alert("Please Fill All the entries of the Form")
  }
}
public login(){
  this.router.navigate(['/login'])
  }

}
