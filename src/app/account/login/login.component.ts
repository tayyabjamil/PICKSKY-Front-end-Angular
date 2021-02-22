import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit,ViewChild, ElementRef  } from '@angular/core';
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
import { CartService } from 'src/app/home/cart.service';
import { ToastrService } from 'ngx-toastr';
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
    private toastr: ToastrService,
    public mediaObserver: MediaObserver,
    private router: Router,
    public formBuilder: FormBuilder,
    public accountService: AccountService, public cartService: CartService,private authService: SocialAuthService, ) { }
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
  cartItems=[]
  backtoCheckOut =''
  @ViewChild('alert', { static: true }) alert: ElementRef;
  ngOnInit() {
     this.backtoCheckOut= localStorage.getItem('backtoCheckOut')
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
      phone: new FormControl('',),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    })
    this.getCartItems()
  }
   getCartItems() {
    this.cartItems = this.cartService.getProducts()

    console.log(this.cartItems)

    return this.cartItems
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

        this.setfName(data.firstName)
        this.setlName(data.lastName)
        this.setPhone(data.phone)
        this.setAccountBonus(data.accountBonus)
        this.setAccountType(data.role)

        this.isLoggedIn = true;

        if(this.backtoCheckOut !== 'true'){
          this.toastr.success('Logged in', 'Success' )
          this.router.navigate(['/'])
        }else{
          this.toastr.success('Logged in', 'Success' )
          this.router.navigate(['/checkOut'])

        }
        this.authPasswordError=''
      }, (error) => {
         if (error.error.message == 'Account not verified') {
            this.accountNotVerfied = 'show'
        }else if(error.error.message == 'Auth Password failed') {
          this.authPasswordError = 'show'
          this.accountNotVerfied = ''

        }else if(error.error.message == 'No Account Create Account First') {
        this.router.navigate(['/signUp'])
        this.toastr.error('No Account Create Account First', 'Error' )
        // alert("No Account Create Account First")
       }
      });
    }else{

      this.fillAllValidation = 'show'

    }


  }

  forgetPassword() {
    this.router.navigate(['/forgetPassword'])
  }
  setAccountType(role){
    localStorage.setItem('role', JSON.stringify(role));

  }
  setfName(firstName){
    localStorage.setItem('firstName', JSON.stringify(firstName));
  }

setlName(lastname){
    localStorage.setItem('lastname', JSON.stringify(lastname));
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
          this.setAccountType(data.role)
          this.isLoggedIn = true;
          if(this.backtoCheckOut !== 'true'){
            this.toastr.success('Logged in', 'Success' )
            this.router.navigate(['/'])
          }else{
            this.router.navigate(['/checkOut'])

          }

        }, (error) => {
          if (error.error.message == 'No Account Create Account First') {
            alert(error.error.message)
            this.router.navigate(['/signUp'])
          }else{
            this.toastr.error('Network Error', 'Failed Try Again' )
          }
        });
      }).catch((error)=>{
        this.toastr.error('Bad Internet Connection  ', 'Try Again' )
      }

      );

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
          this.setAccountType(data.role)
          this.setRefrenceId(data.refrenceId)
          this.isLoggedIn = true;
          if(this.backtoCheckOut !== 'true'){
            this.toastr.success('Logged in', 'Success' )
            this.router.navigate(['/'])
          }else{
            this.router.navigate(['/checkOut'])

          }

        }, (error) => {
          if (error.error.message == 'No Account Create Account First') {
            this.toastr.error('No Account Create Account First', 'Error' )
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
