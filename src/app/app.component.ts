import { Component } from '@angular/core';

import { setTheme } from 'ngx-bootstrap/utils';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SHRIVASAFOODS';
  navShow = true;
  constructor() {
    setTheme('bs3');
  }
  ngOnInIt() {


  }
}
