import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedFlagsSchoolPage } from './red-flags-school.page';

describe('RedFlagsSchoolPage', () => {
  let component: RedFlagsSchoolPage;
  let fixture: ComponentFixture<RedFlagsSchoolPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedFlagsSchoolPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedFlagsSchoolPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
