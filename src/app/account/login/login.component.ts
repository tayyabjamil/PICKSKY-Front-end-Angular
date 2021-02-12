import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { SocialAuthService } from "angularx-social-login";

import {
  GoogleLoginProvider,
  FacebookLoginProvider,
} from 'angularx-social-login';
import { SearchCountryField, TooltipLabel, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  rformLogin: FormGroup
  isLoggedIn = true;
  email: String
  password: String
  loginType = 'email';
  countryCodeValidation =''
  fillAllValidation=''

  constructor(

    public mediaObserver: MediaObserver,
    private router: Router,
    public formBuilder: FormBuilder,
    public accountService: AccountService, private authService: SocialAuthService, ) { }
  mediaSub: Subscription
  deviceXs: boolean;
  deviceLg: boolean;
  deviceMd: boolean;
  deviceSm: boolean;
  show: boolean;
  CountryISO = CountryISO;
  accountNotVerfied = ''
  authPassword=''
  authPasswordError=''
  ngOnInit() {
    this.mediaSub = this.mediaObserver.media$.subscribe((result: MediaChange) => {
      console.log(result.mqAlias)
      this.deviceXs = result.mqAlias === 'xs'
      this.deviceSm = result.mqAlias === 'sm'
      this.deviceLg = result.mqAlias === 'lg'
      this.deviceMd = result.mqAlias === 'md'
      this.show = false;
    })

    this.rformLogin = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    })
  }

  public createAccount() {
    this.router.navigate(['/signUp'])
  }
  public passwordshow() {
    this.show = !this.show;
  }
  get getcountryCodeValidation(){
    return this.countryCodeValidation
  }
  get getfillAllValidation(){
    return this.fillAllValidation
  }

  login() {
    let loginData: any = {};
    if (this.loginType == 'email') {
      loginData.email = this.rformLogin.value.email;
      loginData.password = this.rformLogin.value.password;
    }
    if (this.loginType == 'phone') {
      if(this.rformLogin.value.phone==null){
       this.countryCodeValidation = 'show'
      }

        loginData.email = this.rformLogin.value.phone.internationalNumber;

        this.countryCodeValidation = ''

      loginData.password = this.rformLogin.value.password;
    }

    if (loginData.email && loginData.password) {
      this.fillAllValidation = ''

      this.accountService.login(loginData).subscribe((data: any) => {
        this.accountNotVerfied = 'show'

        this.setId(data.userId);
        this.setusername(data.username);
        this.setemail(data.email)
        this.setRefrenceId(data.refrenceId)
        this.setPhone(data.phone)
        this.setAccountBonus(data.accountBonus)
        this.isLoggedIn = true;
        this.router.navigate(['/'])
        this.authPasswordError=''
      }, (error) => {
         if (error.error.message == 'Account not verified') {
            this.accountNotVerfied = 'show'
        }else if(error.error.message == 'Auth Password failed') {
          this.authPasswordError = 'show'
          this.accountNotVerfied = ''

        }else if(error.error.message == 'No Account Create Account First') {
        this.router.navigate(['/signUp'])

        alert("No Account Create Account First")
       }
      });
    }else{
      this.fillAllValidation = 'show'

    }


  }

  forgetPassword() {
    this.router.navigate(['/forgetPassword'])
  }
  setId(userId) {
    localStorage.setItem('userId', JSON.stringify(userId));
  }
  setAccountBonus(accountBonus) {
    localStorage.setItem('accountBonus', JSON.stringify(accountBonus));
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

  passwordResetToken(token) {
    localStorage.setItem('resetToken', JSON.stringify(token));
  }

  setemail(email) {
    localStorage.setItem('email', JSON.stringify(email));
  }
  setPhone(phone){
    localStorage.setItem('phone', JSON.stringify(phone));

  }

  signInGoogle(platform: string) {
    platform = GoogleLoginProvider.PROVIDER_ID;
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((Response) => {
        console.log(platform + 'logged in user is ', Response);

        const userAccount = {
          email: Response.email,
          firstName: Response.firstName,
          lastName: Response.lastName,
          contact: Response.provider,
          provider: Response.provider,
          password: Response.id,
        };


        this.accountService.signIn(userAccount).subscribe((data: any) => {


          this.setId(data.userId);
          this.setusername(data.username);
          this.setemail(data.email)
          this.setAccountBonus(data.accountBonus)
          this.setPhone(data.email)
          this.setRefrenceId(data.refrenceId)
          this.isLoggedIn = true;
          this.router.navigate(['/'])

        }, (error) => {
          if (error.error.message == 'No Account Create Account First') {
            alert(error.error.message)
            this.router.navigate(['/signUp'])
          }else{
            alert("Network Error")
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
          firstName: Response.firstName,
          lastName: Response.lastName,
          password: Response.id,
          token: Response.authToken,
        };

        this.accountService.signIn(userAccount).subscribe((data: any) => {


          this.setId(data.userId);
          this.setusername(data.username);
          this.setemail(data.email)
          this.setAccountBonus(data.accountBonus)
          this.setPhone(data.email)

          this.setRefrenceId(data.refrenceId)
          this.isLoggedIn = true;
          this.router.navigate(['/'])

        }, (error) => {
          if (error.error.message == 'No Account Create Account First') {
            alert(error.error.message)
            this.router.navigate(['/signUp'])
          }
        });

      });
  }


  toggleLoginType(type) {
    if (type == 'email') {
      this.loginType = 'email';
      this.countryCodeValidation = ''
    } else {

      this.loginType = 'phone';


    }
  }
}
