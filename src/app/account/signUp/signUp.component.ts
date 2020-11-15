import { Router } from '@angular/router';
import { AccountService } from './../account.service';
import { FormBuilder, FormGroup,FormControl ,Validators} from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
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
  constructor(public formBuilder:FormBuilder,public accountService:AccountService,private router:Router) { }

  ngOnInit() {
    this.rformSignup = this.formBuilder.group({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required,Validators.email]),
      password: new FormControl('', [Validators.required]),
      contact: new FormControl('', [Validators.required]),
    })
  }
createAccount(){
  if(this.rformSignup.valid){
 this.accountService.createuserAccount(this.rformSignup.value).subscribe((data: any) => {
  alert("Account Created")
  this.router.navigate(['/login'])

  }, (error) => {
    alert(error.error.message);

  });
  }
  else{
    alert("Please Fill All the entries of the Form")
  }
}

}
