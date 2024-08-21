import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServicesService } from '../allServices/api-services.service';

@Component({
  selector: 'app-edit-hotel',
  templateUrl: './edit-hotel.component.html',
  styleUrls: ['./edit-hotel.component.css']
})
export class EditHotelComponent implements OnInit {
  editHotelForm: FormGroup;
  hotelId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private as: ApiServicesService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.editHotelForm = this.fb.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      pricePerNight: ['', Validators.required],
      description: ['', Validators.required],
      photos: [null],
      amenities: this.fb.group({
        wifi: [false],
        parking: [false],
        pool: [false],
        gym: [false],
        restaurant: [false],
        spa: [false]
      })
    });
  }

  ngOnInit(): void {
    this.hotelId = this.route.snapshot.paramMap.get('id');
    if (this.hotelId) {
      this.getHotelDetails(this.hotelId);
    }
  }

  getHotelDetails(id: string) {
    this.as.getHotelById(id).subscribe({
      next: (hotel: any) => {
        this.editHotelForm.patchValue(hotel);
      },
      error: (error: any) => {
        console.log(error.error);
      }
    });
  }

  updateHotel() {
    if (this.editHotelForm.valid && this.hotelId) {
      const formData = new FormData();
      formData.append('name', this.editHotelForm.get('name')?.value);
      formData.append('location', this.editHotelForm.get('location')?.value);
      formData.append('pricePerNight', this.editHotelForm.get('pricePerNight')?.value);
      formData.append('description', this.editHotelForm.get('description')?.value);

      const amenities = this.editHotelForm.get('amenities')?.value;
      Object.keys(amenities).forEach(key => {
        if (amenities[key]) {
          formData.append('amenities', key);
        }
      });

      this.as.updateHotel (this.hotelId, formData).subscribe({
        next: (result: any) => {
          console.log('Hotel updated:', result);
          this.router.navigate(['/']);
        },
        error: (error: any) => {
          console.log(error.error);
        }
      });
    }
  }
}
