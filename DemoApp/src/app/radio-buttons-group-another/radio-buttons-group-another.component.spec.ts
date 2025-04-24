import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioButtonsGroupAnotherComponent } from './radio-buttons-group-another.component';

describe('RadioButtonsGroupAnotherComponent', () => {
  let component: RadioButtonsGroupAnotherComponent;
  let fixture: ComponentFixture<RadioButtonsGroupAnotherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RadioButtonsGroupAnotherComponent]
    });
    fixture = TestBed.createComponent(RadioButtonsGroupAnotherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
