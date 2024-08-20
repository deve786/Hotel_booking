import { Component } from '@angular/core';

@Component({
  selector: 'app-management-bookings',
  templateUrl: './management-bookings.component.html',
  styleUrls: ['./management-bookings.component.css']
})
export class ManagementBookingsComponent {
  bookings: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    // Load bookings data; replace with actual logic
    this.bookings = [
      { id: 1, hotel: 'Hotel A', user: 'John Doe', date: '2024-08-01', status: 'Confirmed' },
      { id: 2, hotel: 'Hotel B', user: 'Jane Smith', date: '2024-08-02', status: 'Pending' },
      // Add more sample bookings
    ];
  }
}
