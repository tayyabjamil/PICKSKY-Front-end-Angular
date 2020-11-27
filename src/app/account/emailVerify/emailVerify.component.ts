
import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/account/account.service';

@Component({
  selector: 'app-emailVerify',
  templateUrl: './emailVerify.component.html',
  styleUrls: ['./emailVerify.component.scss']
})
export class EmailVerifyComponent implements OnInit {
isVerify = true
accountToken;
constructor(   public accountService:AccountService, public route: ActivatedRoute) { }


  ngOnInit() {
    const token = this.route.snapshot.paramMap.get("token");
    this.accountToken = token;
  this.verify()
  }
verify(){

   const data = {
    accountToken :this.accountToken,
     isVerify:  this.isVerify

   }
  this.accountService.accountVerify(data).subscribe((data: any) => {
    alert("Shipping")

  })

}
}
