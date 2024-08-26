import { Component } from '@angular/core';
import { ApiServicesService } from '../allServices/api-services.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent {
  totalBookings: any = 0;
  pendingBookings: any = 0;
  completedBookings: any = 0;

  constructor(private apiService: ApiServicesService) { }

  ngOnInit(): void {
    this.getBookingStats();
  }

  getBookingStats(): void {
    const userString = localStorage.getItem('currentUser');
    if (userString) {
      const user = JSON.parse(userString);
      const userId = user.id; // Access the user ID
      // console.log('User ID:', userId);

      // Fetch total bookings
      this.apiService.getBookingsByUserId(userId).subscribe(
        (bookings: any) => {
          
          
          this.totalBookings = bookings.length;
          
          // Fetch pending bookings
          this.apiService.getPendingBookingsByUserId(userId).subscribe(
            (pendingBookings: any) => {
              // console.log(pendingBookings);
              
              this.pendingBookings = pendingBookings.length;

              // Fetch completed bookings
              this.apiService.getCompletedBookingsByUserId(userId).subscribe(
                (completeBookings: any) => {
                  // console.log(completeBookings);
                  
                  this.completedBookings = completeBookings.length;
                  // console.log(this.completedBookings);
                  
                },
                (error: any) => {
                  console.error('Error fetching completed bookings:', error);
                }
              );
            },
            (error: any) => {
              console.error('Error fetching pending bookings:', error);
            }
          );
        },
        (error: any) => {
          console.error('Error fetching total bookings:', error);
        }
      );
    }
  }
}
