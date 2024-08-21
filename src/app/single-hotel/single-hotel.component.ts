import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiServicesService } from '../allServices/api-services.service';

@Component({
  selector: 'app-single-hotel',
  templateUrl: './single-hotel.component.html',
  styleUrls: ['./single-hotel.component.css']
})
export class SingleHotelComponent implements OnInit {
  hotel: any = {};
  checkInDate: string = '';
  checkOutDate: string = '';
  guestCount: number = 1;
  totalCost: number = 0;
  dateError: string = '';
  baseUrl = 'http://localhost:5000';
  userId:any=''

  constructor(
    private as: ApiServicesService,
    private route: ActivatedRoute
  ) { }

  getMe(){
    this.userId=this.as.getCurrentUser().id
    console.log(this.userId);
    
  }

  ngOnInit(): void {
    this.getMe()
    this.route.paramMap.subscribe(params => {
      const hotelId = params.get('id');


      if (hotelId) {
        this.getHotelDetails(hotelId);
      }
    });
  }

  validateDates() {
    const checkIn = new Date(this.checkInDate);
    const checkOut = new Date(this.checkOutDate);

    if (this.checkInDate && this.checkOutDate && checkOut <= checkIn) {
      this.dateError = 'Check-Out date must be after Check-In date.';
    } else {
      this.dateError = '';
    }
  }

  getHotelDetails(id: string): void {
    this.as.getHotelById(id).subscribe(data => {
      this.hotel = data;
      console.log(this.hotel);

      this.totalCost = this.hotel.pricePerNight;
    });
  }

  getImageUrl(photoPath: string): string {
    return `${this.baseUrl}/${photoPath}`;
  }

  increaseGuests() {
    this.guestCount += 1;
    this.updateTotalCost();
  }

  decreaseGuests() {
    if (this.guestCount > 1) {
      this.guestCount -= 1;
      this.updateTotalCost();
    }
  }

  updateTotalCost() {
    this.totalCost = this.hotel.pricePerNight * this.guestCount;
  }

  handleBooking() {
    this.validateDates(); // Ensure dates are validated before proceeding

    if (this.dateError) {
      console.error('Booking error:', this.dateError);
      return;
    }

    const bookingDetails = {
      hotelId: this.hotel._id,
      checkInDate: this.checkInDate,
      checkOutDate: this.checkOutDate,
      guestCount: this.guestCount,
      totalCost: this.totalCost,
      user:this.userId
    };

    this.as.createBooking(bookingDetails).subscribe(
      response => {
        console.log('Booking successful:', response);
        // Display a success message or redirect to a confirmation page
      },
      error => {
        console.error('Booking error:', error);
        // Display an error message to the user
      }
    );
  }
}
