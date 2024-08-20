import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementBookingsComponent } from './management-bookings.component';

describe('ManagementBookingsComponent', () => {
  let component: ManagementBookingsComponent;
  let fixture: ComponentFixture<ManagementBookingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagementBookingsComponent]
    });
    fixture = TestBed.createComponent(ManagementBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
