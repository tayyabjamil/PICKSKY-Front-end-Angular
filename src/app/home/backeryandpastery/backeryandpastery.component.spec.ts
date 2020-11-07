/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BackeryandpasteryComponent } from './backeryandpastery.component';

describe('BackeryandpasteryComponent', () => {
  let component: BackeryandpasteryComponent;
  let fixture: ComponentFixture<BackeryandpasteryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackeryandpasteryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackeryandpasteryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
