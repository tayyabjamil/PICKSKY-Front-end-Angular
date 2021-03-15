import { TextFieldComponent } from './../../account/textField/textField.component';
import { Router } from '@angular/router';
import { AccountService } from './../account.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { SocialAuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { patternValidator } from '../customValidator'
import {
  GoogleLoginProvider,
  FacebookLoginProvider,
} from 'angularx-social-login';
import { SearchCountryField, TooltipLabel, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { ToastrService } from 'ngx-toastr';
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-signUp',
  templateUrl: './signUp.component.html',
  styleUrls: ['./signUp.component.scss']
})
export class SignUpComponent implements OnInit {
  rformSignup: FormGroup
  username: string
  email: string
  password: string
  contact: number
  phone;
  CountryISO = CountryISO;

  showConfirmPass: boolean
  showPass: boolean
  constructor(
    private toastr: ToastrService,
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
  isLoggedIn = true;
  passwordMatch=false
  fillAllValidation=''
  countryCodeValidation=''
  showEmailAlready=''

  ngOnInit() {
    window.scrollTo(0, 0);
    this.mediaSub = this.mediaObserver.media$.subscribe((result: MediaChange) => {
      console.log(result.mqAlias)
      this.deviceXs = result.mqAlias === 'xs'
      this.deviceSm = result.mqAlias === 'sm'
      this.deviceLg = result.mqAlias === 'lg'
      this.deviceMd = result.mqAlias === 'md'
    })
    this.show = false;
    this.rformSignup = this.formBuilder.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      phone: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(8),

        patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        patternValidator(/[a-z]/, { hasSmallCase: true }),
        patternValidator(/[0-9]/, { hasDigit: true }),

        // TextFieldComponent.patternValidator(/[ [!@#$%^&*()_+-=[]{};':"|,.<>/?]/](<mailto:!@#$%^&*()_+-=[]{};':"|,.<>/?]/>), { hasSpecialCharacters: true }),

      ])),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
    })
  }



  signUpGoogle(platform: string) {
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
        this.accountService.signUp(userAccount).subscribe((data: any) => {
          this.toastr.success('Account Created', 'Success' )
          this.router.navigate(['/login'])

        }, (error) => {

          this.toastr.error('Already have an account Just login', 'Error' )
          this.router.navigate(['/login'])
        });
      });

  }
  signUpFacebook(platform: string) {
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
          provider: Response.provider,

        };

        this.accountService.signUp(userAccount).subscribe((data: any) => {
          this.toastr.success('Account Created', 'Success' )
          this.router.navigate(['/login'])

        }, (error) => {
          this.toastr.error('Already have an account Just login', 'Error' )
          this.router.navigate(['/login'])

        });
      });
  }
  signOut(): void {
    this.authService.signOut();
  }
  public passwordshow() {
    this.showPass = !this.showPass;
  }
  public confirmpasswordshow() {
    this.showConfirmPass = !this.showConfirmPass;
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

  get getfillAllValidation(){
    return this.fillAllValidation
  }
  createAccount() {
//     this.rformSignup.controls['phone'].clearValidators();
// if(this.rformSignup.value.phone==null){
//   this.countryCodeValidation = 'show'
// }else{

    if (this.rformSignup.value.phone) {
      this.rformSignup.controls['phone'].setValue(this.rformSignup.value.phone.e164Number);


    }

    if (this.rformSignup.valid) {
      this.fillAllValidation = ''

      if (this.rformSignup.value.password === this.rformSignup.value.confirmPassword) {
        this.accountService.createuserAccount(this.rformSignup.value).subscribe((data: any) => {
          this.showEmailAlready = ''
          this.toastr.success('Account Created', 'Success' )
          this.router.navigate(['/login'])

        }, (error) => {
          if(error.error.message = 'Email Already Exist'){
          this.showEmailAlready = 'show'
          }
        });
      } else {
        this.passwordMatch=true
      }
    }
    else {
      this.fillAllValidation = 'show'
    }
  }
// }
  get passwordValidMatch(){
    return this.passwordMatch
  }
  public login() {
    this.router.navigate(['/login'])
  }

}
