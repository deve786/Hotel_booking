import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleHotelComponent } from './single-hotel.component';

describe('SingleHotelComponent', () => {
  let component: SingleHotelComponent;
  let fixture: ComponentFixture<SingleHotelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingleHotelComponent]
    });
    fixture = TestBed.createComponent(SingleHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
