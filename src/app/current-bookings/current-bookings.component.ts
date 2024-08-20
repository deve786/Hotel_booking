import { Component } from '@angular/core';

@Component({
  selector: 'app-current-bookings',
  templateUrl: './current-bookings.component.html',
  styleUrls: ['./current-bookings.component.css']
})
export class CurrentBookingsComponent {
  currentBookings = [
    { id: '1', hotelName: 'Hotel Sunshine', date: new Date(), status: 'Confirmed' },
    { id: '2', hotelName: 'Grand Palace', date: new Date(), status: 'Pending' }
    
  ];
}
