/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SweetandHotComponent } from './sweetandhot.component';

describe('SweetandHotComponent', () => {
  let component: SweetandHotComponent;
  let fixture: ComponentFixture<SweetandHotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SweetandHotComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SweetandHotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
