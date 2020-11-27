/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AboutUSComponent } from './aboutus.component';

describe('AboutUSComponent', () => {
  let component: AboutUSComponent;
  let fixture: ComponentFixture<AboutUSComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AboutUSComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutUSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
