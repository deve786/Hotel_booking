import { Component, OnInit } from '@angular/core';
import { ApiServicesService } from '../allServices/api-services.service'; // Adjust path as needed

@Component({
  selector: 'app-management-bookings',
  templateUrl: './management-bookings.component.html',
  styleUrls: ['./management-bookings.component.css']
})
export class ManagementBookingsComponent implements OnInit {
  bookings: any[] = [];
  baseUrl = 'http://localhost:5000'; // Your base URL for image paths
  hotels: any[] = [];

  constructor(private apiService: ApiServicesService) { }

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    this.apiService.getBookings().subscribe(
      (bookings: any) => {
        this.bookings = bookings;
        // console.log('Bookings:', this.bookings);

        // Fetch hotel and user details for each booking
        this.bookings.forEach(booking => {
          // Fetch hotel details
          this.apiService.getHotelById(booking.hotelId).subscribe(
            (hotel: any) => {
              booking.hotelDetails = hotel;
              // console.log('Hotel Details for Booking:', booking.hotelDetails);

              // Fetch user details
              this.apiService.getSingleUserApi(booking.user).subscribe(
                (user: any) => {
                  booking.userDetails = user; // Add user details to booking
                  // console.log('User Details for Booking:', booking.userDetails);
                },
                (error: any) => {
                  console.error('Error loading user details:', error);
                }
              );
            },
            (error: any) => {
              console.error('Error loading hotel details:', error);
            }
          );
        });
      },
      (error: any) => {
        console.error('Error loading bookings:', error);
      }
    );
  }

  getImageUrl(photoPath: string): string {
    return `${this.baseUrl}/${photoPath}`;
  }

  viewBooking(id: number): void {
    console.log('View booking:', id);
    // You might use a router or modal here
  }

  updateBooking(id: number): void {
    console.log('Update booking:', id);
    // You might navigate to an update form or open a modal
  }

  deleteBooking(id: any): void {
    if (confirm('Are you sure you want to delete this booking?')) {
      this.apiService.deleteBooking(id).subscribe(
        () => {
          this.loadBookings(); // Reload bookings after deletion
        },
        (error: any) => {
          console.error('Error deleting booking:', error);
        }
      );
    }
  }
}
