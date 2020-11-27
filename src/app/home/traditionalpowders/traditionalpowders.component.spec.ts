/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TraditionalPowdersComponent } from './traditionalpowders.component';

describe('TraditionalPowdersComponent', () => {
  let component: TraditionalPowdersComponent;
  let fixture: ComponentFixture<TraditionalPowdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TraditionalPowdersComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraditionalPowdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
