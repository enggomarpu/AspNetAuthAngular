import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioButtonsGroupComponent } from './radio-buttons-group.component';

describe('RadioButtonsGroupComponent', () => {
  let component: RadioButtonsGroupComponent;
  let fixture: ComponentFixture<RadioButtonsGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RadioButtonsGroupComponent]
    });
    fixture = TestBed.createComponent(RadioButtonsGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
