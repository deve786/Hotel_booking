import { Component } from '@angular/core';
import { ApiServicesService } from '../allServices/api-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hotel-mangement',
  templateUrl: './hotel-mangement.component.html',
  styleUrls: ['./hotel-mangement.component.css']
})
export class HotelMangementComponent {
  hotels: any[] = [];
  baseUrl = 'http://localhost:5000';

  constructor(private as: ApiServicesService, private router: Router) { }

  ngOnInit(): void {
    this.getAllHotels()
  }

  getAllHotels() {
    this.as.getHotels().subscribe({
      next: (result: any) => {
        // console.log(result);
        this.hotels = result;
      },
      error: (result: any) => {
        console.log(result.error);
      }
    });
  }

  getImageUrl(photoPath: string): string {
    return `${this.baseUrl}/${photoPath}`;
  }

  deleteHotel(id: any) {
    this.as.deleteHotel(id).subscribe({
      next: (result: any) => {
        // console.log(result);
        this.getAllHotels();
      },
      error: (error: any) => {
        console.log(error.error);
      }
    });
  }
  editHotel(id: any) {
    this.router.navigateByUrl(`/edit-hotel/${id}`);
  }
  
  navigateToAddHotel() {
    this.router.navigate(['/admin/add']);
  }
  
}
