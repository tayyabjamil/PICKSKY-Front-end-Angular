/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FishandmeatComponent } from './fishandmeat.component';

describe('FishandmeatComponent', () => {
  let component: FishandmeatComponent;
  let fixture: ComponentFixture<FishandmeatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FishandmeatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FishandmeatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
