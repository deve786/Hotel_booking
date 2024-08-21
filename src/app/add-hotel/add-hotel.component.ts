import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiServicesService } from '../allServices/api-services.service';

@Component({
  selector: 'app-add-hotel',
  templateUrl: './add-hotel.component.html',
  styleUrls: ['./add-hotel.component.css']
})
export class AddHotelComponent {
  addHotelForm: FormGroup;
  selectedImages: string[] = [];
  fileInput: HTMLInputElement | null = null;

  constructor(private fb: FormBuilder,private as: ApiServicesService) {
    this.addHotelForm = this.fb.group({
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

  onImageSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      // Limit the number of selected images to 3
      this.selectedImages = Array.from(input.files).slice(0, 3).map(file => URL.createObjectURL(file));
      this.fileInput = input; // Save the reference to the file input element
    }
  }

  addHotel() {
    if (this.addHotelForm.valid) {
      const formData = new FormData();
     
      
      formData.append('name', this.addHotelForm.get('name')?.value);
      formData.append('location', this.addHotelForm.get('location')?.value);
      formData.append('pricePerNight', this.addHotelForm.get('pricePerNight')?.value);
      formData.append('description', this.addHotelForm.get('description')?.value);

      if (this.fileInput?.files) {
        Array.from(this.fileInput.files).slice(0, 3).forEach(file => {
          formData.append('photos', file, file.name);
        });
      }

      const amenities = this.addHotelForm.get('amenities')?.value;
      Object.keys(amenities).forEach(key => {
        if (amenities[key]) {
          formData.append('amenities', key);
        }
      });

      
      this.as.addHotel(formData).subscribe({
        next:(result)=>{
          console.log(result);
          
        },
        error:(error:any)=>{
          console.log(error.error);
          
        }
      })
      console.log('Hotel added:', formData);
    
      // Reset form after submission
      this.addHotelForm.reset();
      this.selectedImages = [];
      if (this.fileInput) {
        this.fileInput.value = '';
      }
    }
  }
}
