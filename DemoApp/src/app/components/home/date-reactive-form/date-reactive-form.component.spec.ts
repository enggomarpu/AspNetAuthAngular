import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateReactiveFormComponent } from './date-reactive-form.component';

describe('DateReactiveFormComponent', () => {
  let component: DateReactiveFormComponent;
  let fixture: ComponentFixture<DateReactiveFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DateReactiveFormComponent]
    });
    fixture = TestBed.createComponent(DateReactiveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
