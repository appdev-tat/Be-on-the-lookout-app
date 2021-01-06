import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutBotlComponent } from './about-botl.component';

describe('AboutBotlComponent', () => {
  let component: AboutBotlComponent;
  let fixture: ComponentFixture<AboutBotlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutBotlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutBotlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
