import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
username;
email;
contact;
comment;
  constructor() { }

  ngOnInit() {
    window.scrollTo(0, 0);

  }
submit(){

}
}
