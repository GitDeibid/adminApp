/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddRolComponent } from './add-rol.component';

describe('AddRolComponent', () => {
  let component: AddRolComponent;
  let fixture: ComponentFixture<AddRolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
