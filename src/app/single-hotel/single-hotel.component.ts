import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiServicesService } from '../allServices/api-services.service';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';

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
  minDate: string = '';  // Minimum date for check-in
  minCheckOutDate: string = ''; // Minimum date for check-out
  baseUrl = 'http://localhost:5000';
  userId: any = '';
  reviewText: string = ''; // Added for review text
  reviews: any = []; // Array to hold reviews
  userName: any = ''
  starRating: number = 0;
  public payPalConfig?: IPayPalConfig;

  constructor(
    private as: ApiServicesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const user = this.getMe();

    const today = new Date();
    this.minDate = today.toISOString().split('T')[0]; // Set min date as today
    this.minCheckOutDate = this.minDate; // Initially, check-out date should be at least today

    this.route.paramMap.subscribe(params => {
      const hotelId = params.get('id');
      if (hotelId) {
        this.getHotelDetails(hotelId);
        this.getReviews(hotelId); // Fetch reviews when component loads
      }
    });
  }

  getMe() {
    try {
      this.userId = this.as.getCurrentUser().id;
    }
    catch (error) {
      console.log(error);
    }
  }

  validateDates() {
    const checkIn = new Date(this.checkInDate);
    const checkOut = new Date(this.checkOutDate);

    if (this.checkInDate && this.checkOutDate && checkOut <= checkIn) {
      this.dateError = 'Check-Out date must be after Check-In date.';
    } else {
      this.dateError = '';
      this.updateTotalCost(); // Update total cost if dates are valid
    }
  }

  updateTotalCost() {
    const checkIn = new Date(this.checkInDate);
    const checkOut = new Date(this.checkOutDate);
    if (checkIn && checkOut && checkOut > checkIn) {
      const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
      this.totalCost = nights * this.hotel.pricePerNight * this.guestCount;
    } else {
      this.totalCost = this.hotel.pricePerNight * this.guestCount; // Default cost if dates are not valid
    }
  }

  getHotelDetails(id: string): void {
    this.as.getHotelById(id).subscribe(data => {
      this.hotel = data;
      this.totalCost = this.hotel.pricePerNight; // Set default cost based on the initial state
    });
  }

  getStarArray(stars: number): number[] {
    return Array(stars).fill(0); // Creates an array with 'stars' number of 0s
  }

  getReviews(id: string): void {
    this.as.getReviewsByHotelId(id).subscribe(reviews => {
      this.reviews = reviews;
      this.reviews.forEach((review: any, index: any) => {
        this.as.getSingleUserApi(review.userId).subscribe({
          next: (result: any) => {
            // Add username to the corresponding review
            this.reviews[index].username = result.name;
          },
          error: (err) => {
            console.error('Error fetching username for review:', err);
          }
        });
      });
    });
  }

  getAmenityIcon(amenity: string): string {
    switch (amenity.toLowerCase()) {
      case 'wifi':
        return 'wifi';
      case 'parking':
        return 'local_parking';
      case 'pool':
        return 'pool';
      case 'gym':
        return 'fitness_center';
      case 'restaurant':
        return 'restaurant';
      default:
        return 'check_circle'; // default icon if no specific match
    }
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

  handleBooking() {
    if (!this.userId) {
      alert('You must be logged in to make a booking.');
      return;
    }
  
    this.validateDates();
    if (this.dateError) {
      console.error('Booking error:', this.dateError);
      alert(`Booking error: ${this.dateError}`);
      return;
    }
  
    const bookingDetails = {
      hotelId: this.hotel._id,
      checkInDate: this.checkInDate,
      checkOutDate: this.checkOutDate,
      guestCount: this.guestCount,
      totalCost: this.totalCost,
      user: this.userId
    };
    this.as.createBooking(bookingDetails).subscribe(
      response => {
        console.log('Booking successful:', response);
      },
      error => {
        console.error('Booking error:', error);
      }
    );
  }
  private initConfig(): void {
    this.payPalConfig = {
      currency: 'USD',
      clientId: 'YOUR_SANDBOX_CLIENT_ID', // Replace with your sandbox client ID
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'USD',
            value: this.totalCost.toString(),
          },
        }]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then((details: any) => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });
      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        const bookingDetails = {
          hotelId: this.hotel._id,
          checkInDate: this.checkInDate,
          checkOutDate: this.checkOutDate,
          guestCount: this.guestCount,
          totalCost: this.totalCost,
          user: this.userId
        };
        this.as.createBooking(bookingDetails).subscribe(
          response => {
            console.log('Booking successful:', response);
          },
          error => {
            console.error('Booking error:', error);
          }
        );
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
        alert("Transaction has been Cancelled.");
      },
      onError: err => {
        console.log('OnError', err);
        alert("Transaction Failed..!, Try after some time");
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      }
    };
  }

  submitReview() {
    if (!this.userId) {
      alert('You must be logged in to submit a review.');
      return;
    }
  
    if (this.reviewText.trim() && this.starRating > 0) {
      const review = {
        hotelId: this.hotel._id,
        userId: this.userId,
        text: this.reviewText,
        stars: this.starRating
      };
  
      this.as.postReview(review).subscribe(
        (response: any) => {
          console.log(this.hotel._id, this.starRating);
          
          // Update the hotel rating after review submission
          this.as.updateHotelRating(this.hotel._id, this.starRating).subscribe(
            (updateResponse: any) => {
              console.log('Hotel rating updated:', updateResponse);
              this.hotel.rating = updateResponse.rating; // Update local hotel rating
              this.hotel.ratingCount = updateResponse.ratingCount; // Update local hotel rating count
            },
            (error: any) => {
              console.error('Error updating hotel rating:', error);
            }
          );
  
          this.reviewText = ''; // Clear the textarea
          this.starRating = 0; // Reset star rating
          this.getReviews(this.hotel._id); // Refresh reviews list
        },
        (error: any) => {
          console.error('Error submitting review:', error);
        }
      );
    }
  }
}
