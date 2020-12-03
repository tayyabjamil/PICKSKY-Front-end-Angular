import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnandrefundsComponent } from './returnandrefunds.component';

describe('ReturnandrefundsComponent', () => {
  let component: ReturnandrefundsComponent;
  let fixture: ComponentFixture<ReturnandrefundsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReturnandrefundsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnandrefundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
