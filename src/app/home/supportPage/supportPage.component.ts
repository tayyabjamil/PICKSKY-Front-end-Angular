import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/home/product.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import  {MediaObserver, MediaChange} from '@angular/flex-layout';
import  { Subscription } from 'rxjs';

@Component({
  selector: 'app-supportPage',
  templateUrl: './supportPage.component.html',
  styleUrls: ['./supportPage.component.css']
})
export class SupportPageComponent implements OnInit {
  rformSupport:FormGroup
  username;
  email;
  message;
  constructor(
    // public mediaObserver:MediaObserver,public formBuilder: FormBuilder, public productService: ProductService,
    // private router: Router, public http: HttpClient
    ) { }
    mediaSub:Subscription
    deviceXs:boolean;
    deviceLg:boolean;
    deviceMd:boolean;
    deviceSm:boolean;
  ngOnInit() {
    // this.mediaSub = this.mediaObserver.media$.subscribe((result:MediaChange)=>{
    //   console.log(result.mqAlias)
    //   this.deviceXs = result.mqAlias === 'xs'
    //   this.deviceSm = result.mqAlias ==='sm'
    //   this.deviceLg = result.mqAlias === 'lg'
    //   this.deviceMd = result.mqAlias === 'md'

    // })
    // this.rformSupport = this.formBuilder.group({
    //   username: new FormControl(''),
    //   email: new FormControl('', Validators.email),

    //   message: new FormControl('' )
    // });
  }

  // sendQuery(){

  //   this.productService.supportPage(this.rformSupport.value).subscribe((data: any) => {
  //    alert("Query Sent")

  //    }, (error) => {
  //      alert(error.error.message);

  //    });
  //  }
}
