import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { HeaderConstants, PicklesConstants, TraditionalPodulu, SweetsandHotConstants, SpecialConstants, SupportConstants, AboutusConstants } from '../../appconstants';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(private breakpointObserver: BreakpointObserver, private router: Router ) {}

  isShow = false;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  ngOnInit() {
  }
  toggleDisplay() {
    this.isShow = !this.isShow;
  }
  catagory(page){
    this.router.navigate(['catagory/', page])
     }
  getHeaderNames(indx: number) { return HeaderConstants[indx]; }

  getPicklesConstants(indx: number) { return PicklesConstants[indx]; }

  getTraditionalPodulu(indx: number) { return TraditionalPodulu[indx]; }

  getSweetsandHotConstants(indx: number) { return SweetsandHotConstants[indx] }

  getSpecialConstants(indx: number) { return SpecialConstants[indx]; }

  getOthersConstants(indx: number) { return SupportConstants[indx] }

  getAboutusConstants(indx: number) { return AboutusConstants[indx] }

  getSupportConstants(indx: number) { return SupportConstants[indx] }


}
