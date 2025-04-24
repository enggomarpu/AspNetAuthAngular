import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrivalDepartureComponent } from './arrival-departure.component';

describe('ArrivalDepartureComponent', () => {
  let component: ArrivalDepartureComponent;
  let fixture: ComponentFixture<ArrivalDepartureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArrivalDepartureComponent]
    });
    fixture = TestBed.createComponent(ArrivalDepartureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
