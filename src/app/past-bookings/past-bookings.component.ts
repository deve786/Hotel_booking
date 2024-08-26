import { Component } from '@angular/core';
import { ApiServicesService } from '../allServices/api-services.service';

@Component({
  selector: 'app-past-bookings',
  templateUrl: './past-bookings.component.html',
  styleUrls: ['./past-bookings.component.css']
})
export class PastBookingsComponent {
  pastBookings: any[] = [];
  baseUrl = 'http://localhost:5000';
  constructor(private apiService: ApiServicesService) { }

  ngOnInit(): void {
      this.viewPastBookings();
  }

  deleteBooking(id:any){
    
      this.apiService.deleteBooking(id).subscribe({
        next:(result:any)=>{
          console.log(result);
          this.viewPastBookings()
        }
      })
    
  }

  viewPastBookings(): void {
      const userString = localStorage.getItem('currentUser');

      if (userString) {
          try {
              const user = JSON.parse(userString);
              const id = user.id;
              // console.log('User ID:', id);

              this.apiService.pastBookingsApi(id).subscribe({
                  next: (result: any) => {
                      this.pastBookings = result;
                      // console.log('Past Bookings:', result);
                      this.pastBookings.forEach(booking => {
                        // Fetch hotel details
                        this.apiService.getHotelById(booking.hotelId).subscribe(
                          (hotel: any) => {
                            booking.hotelDetails = hotel;
                            console.log('Hotel Details for Booking:', booking.hotelDetails);
              
                            // Fetch user details
                            this.apiService.getSingleUserApi(booking.user).subscribe(
                              (user: any) => {
                                booking.userDetails = user; // Add user details to booking
                                console.log('User Details for Booking:', booking.userDetails);
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
                  error: (err: any) => {
                      console.error('Error fetching past bookings:', err);
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
}
