import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-testimonals',
  templateUrl: './testimonals.component.html',
  styleUrls: ['./testimonals.component.scss']
})
export class TestimonalsComponent implements OnInit {
username;
email;
message;
  constructor() { }

  ngOnInit() {
  }
  submit(){

  }
}
