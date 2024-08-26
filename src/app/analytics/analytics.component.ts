import { Component } from '@angular/core';
import { ApiServicesService } from '../allServices/api-services.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent {
  totalBookings: number = 0;
  totalHotels: number = 0;
  totalUsers: number = 0;

  constructor(private apiService: ApiServicesService) { }

  ngOnInit(): void {
    this.getDetails()
  }

  getDetails() {
    this.apiService.getAllUsers().subscribe({
      next: (result: any) => {
        console.log(result);
        this.totalUsers = result.length
        this.apiService.getHotels().subscribe({
          next: (result: any) => {
            console.log(result);
            this.totalHotels = result.length
            this.apiService.getBookings().subscribe({
              next: (result: any) => {
                console.log(result);
                this.totalBookings = result.length
                
              }
            })
          }
        })
      }
    })
  }
}
