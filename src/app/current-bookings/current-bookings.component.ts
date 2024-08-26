import { Component, OnInit } from '@angular/core';
import { ApiServicesService } from '../allServices/api-services.service'; // Adjust path as needed

@Component({
  selector: 'app-current-bookings',
  templateUrl: './current-bookings.component.html',
  styleUrls: ['./current-bookings.component.css']
})
export class CurrentBookingsComponent implements OnInit {
  currentBookings: any[] = [];
  baseUrl = 'http://localhost:5000';
  constructor(private apiService: ApiServicesService) { }

  ngOnInit(): void {
    this.viewBooking();
  }

  cancelBooking(id:any){
    this.apiService.deleteBooking(id).subscribe({
      next:(result:any)=>{
        // console.log(result);
        this.viewBooking()
      }
    })
  }

  viewBooking(): void {
    // Retrieve and parse the user object from localStorage
    const userString = localStorage.getItem('currentUser');
    
    if (userString) {
      try {
        const user = JSON.parse(userString);
        const id = user.id; // Access the user ID
        // console.log('User ID:', id);

        this.apiService.currentBookingApi(id).subscribe({
          next: (result: any) => {
            this.currentBookings = result;
            //  console.log('Current Bookings:', result);
            this.currentBookings.forEach(booking => {
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
                  console.error('Error loading hotel details:', error.message);
                }
              );
            });
          },
          error: (error: any) => {
            console.error('Error fetching current bookings:', error.error
            );
          }
        });
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    } else {
      console.error('No user found in localStorage');
    }
  }

  getImageUrl(photoPath: string): string {
    return `${this.baseUrl}/${photoPath}`;
  }
  // Uncomment and implement these methods as needed
  // updateBooking(id: string): void {
  //   const booking = this.currentBookings.find(b => b.id === id);
  //   if (booking) {
  //     booking.status = 'Updated';
  //     console.log('Booking updated:', booking);
  //   }
  // }

  // cancelBooking(id: string): void {
  //   if (confirm('Are you sure you want to cancel this booking?')) {
  //     this.currentBookings = this.currentBookings.filter(b => b.id !== id);
  //     console.log('Booking canceled:', id);
  //   }
  // }
}
