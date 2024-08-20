import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelMangementComponent } from './hotel-mangement.component';

describe('HotelMangementComponent', () => {
  let component: HotelMangementComponent;
  let fixture: ComponentFixture<HotelMangementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HotelMangementComponent]
    });
    fixture = TestBed.createComponent(HotelMangementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
