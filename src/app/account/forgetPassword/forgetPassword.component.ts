import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AccountService } from '../account.service';
import  {MediaObserver, MediaChange} from '@angular/flex-layout';
import  { Subscription } from 'rxjs';
import { FormGroup,FormControl,Validators,FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-forgetPassword',
  templateUrl: './forgetPassword.component.html',
  styleUrls: ['./forgetPassword.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  forgetPasswordForm:FormGroup
  constructor( public mediaObserver: MediaObserver,
    private router : Router,
    public formBuilder: FormBuilder,
    public accountService: AccountService, ) { }
    mediaSub:Subscription
    deviceXs:boolean;
    deviceLg:boolean;
    deviceMd:boolean;
    deviceSm:boolean;
    show: boolean;
    passresetToken:String
    token:boolean
    ngOnInit() {
      // this.passresetToken = JSON.parse(localStorage.getItem('resetToken'));
this.token=false
    this.mediaSub = this.mediaObserver.media$.subscribe((result:MediaChange)=>{
      console.log(result.mqAlias)
      this.deviceXs = result.mqAlias === 'xs'
      this.deviceSm = result.mqAlias ==='sm'
      this.deviceLg = result.mqAlias === 'lg'
      this.deviceMd = result.mqAlias === 'md'
    })

    this.forgetPasswordForm = this.formBuilder.group({

      email: new FormControl('', [Validators.required,Validators.email]),

    })

  }
  reset(){
if(this.forgetPasswordForm.valid){
    this.accountService.forgetPassword(this.forgetPasswordForm.value).subscribe((data) => {
      this.token=true
      alert("Mail send to your gmail")


      }, (error) => {
        alert(error.error.message);

      });

    }else{
      alert("Enter correct Gmail Account")
     }
}
}
