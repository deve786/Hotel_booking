import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentBookingsComponent } from './current-bookings.component';

describe('CurrentBookingsComponent', () => {
  let component: CurrentBookingsComponent;
  let fixture: ComponentFixture<CurrentBookingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CurrentBookingsComponent]
    });
    fixture = TestBed.createComponent(CurrentBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
