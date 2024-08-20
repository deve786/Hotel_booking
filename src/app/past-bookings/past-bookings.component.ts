import { Component } from '@angular/core';

@Component({
  selector: 'app-past-bookings',
  templateUrl: './past-bookings.component.html',
  styleUrls: ['./past-bookings.component.css']
})
export class PastBookingsComponent {
  pastBookings = [
    { id: '1', hotelName: 'Oceanview Resort', date: new Date(), status: 'Completed' },
    { id: '2', hotelName: 'Mountain Retreat', date: new Date(), status: 'Cancelled' }
    // more bookings
  ];
  constructor() { }

  ngOnInit(): void {
    // Optionally, fetch past bookings from the server here
  }
}
