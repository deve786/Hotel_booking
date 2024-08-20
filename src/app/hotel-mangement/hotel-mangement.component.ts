import { Component } from '@angular/core';

@Component({
  selector: 'app-hotel-mangement',
  templateUrl: './hotel-mangement.component.html',
  styleUrls: ['./hotel-mangement.component.css']
})
export class HotelMangementComponent {
  hotels: any[] = [];

  constructor() { }

  ngOnInit(): void {
    // Call a method to fetch the hotels data
    this.loadHotels();
  }

  // Method to fetch hotels data
  loadHotels(): void {
    // Sample data; replace this with actual service call to fetch data
    this.hotels = [
      { id: 1, name: 'Hotel Sunshine', location: 'New York' },
      { id: 2, name: 'Hotel Moonlight', location: 'Los Angeles' },
      // Add more sample hotels as needed
    ];
  }
}
