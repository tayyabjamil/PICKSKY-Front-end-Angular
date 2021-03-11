import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AccountService } from '../account.service';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-forgetPassword',
  templateUrl: './forgetPassword.component.html',
  styleUrls: ['./forgetPassword.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  forgetPasswordForm: FormGroup
  constructor(public mediaObserver: MediaObserver,
    private router: Router,public toster:ToastrService,
    public formBuilder: FormBuilder,
    public accountService: AccountService,) { }
  mediaSub: Subscription
  deviceXs: boolean;
  deviceLg: boolean;
  deviceMd: boolean;
  deviceSm: boolean;
  show: boolean;
  passresetToken: String
  token: boolean
  errorForgetPassword = ''
  errorNetwork = ''
  mailsent = ''
  showEmail=''
  ngOnInit() {
    // this.passresetToken = JSON.parse(localStorage.getItem('resetToken'));
    this.token = false
    this.mediaSub = this.mediaObserver.media$.subscribe((result: MediaChange) => {
      console.log(result.mqAlias)
      this.deviceXs = result.mqAlias === 'xs'
      this.deviceSm = result.mqAlias === 'sm'
      this.deviceLg = result.mqAlias === 'lg'
      this.deviceMd = result.mqAlias === 'md'
    })

    this.forgetPasswordForm = this.formBuilder.group({

      email: new FormControl('', [Validators.required, Validators.email]),

    })

  }
  reset() {
    if (this.forgetPasswordForm.valid) {
      this.showEmail=''
      this.accountService.forgetPassword(this.forgetPasswordForm.value).subscribe((data) => {
        this.token = true
        this.mailsent = 'show'
        this.errorForgetPassword = ''
        this.errorNetwork = ''

      }, (error) => {
        if (error.error.message == 'Email NOt found') {
          this.errorForgetPassword = 'show'
        }else if(error.error.message=='Social Account Error'){
          this.toster.error('You Can not Change Password of Social Account ', 'Create Account Manually' )
        }
         else {
          this.errorNetwork = 'show'
        }
        // alert(error.error.message);

      });

    } else {
      if(this.forgetPasswordForm.value.email){

        this.showEmail=''
      }else{
        this.showEmail='show'

      }
    }
  }
}
