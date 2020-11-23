import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  username
  email
  refrenceId
  rformEdit:FormGroup;
  constructor(public http: HttpClient,private myauthService: AuthService) { }

  ngOnInit() {
     this.username =this.myauthService.getusername()
     this.email = this.myauthService.getemail()
     this.refrenceId = this.myauthService.getRefrenceId()

  }

}
