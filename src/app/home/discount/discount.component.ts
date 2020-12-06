import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.scss']
})
export class DiscountComponent implements OnInit {
username;
  constructor( public route: ActivatedRoute, private router : Router, ) { }

  ngOnInit() {
  this.username = this.route.snapshot.paramMap.get("username");
  }

}
