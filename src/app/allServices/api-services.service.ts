import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServicesService {
  baseUrl = 'http://localhost:5000'
  private currentUserKey = 'currentUser';

  constructor(private http: HttpClient) { }

  signIn(bodyData: any) {
    return this.http.post(`${this.baseUrl}/api/auth/login`, bodyData).pipe(
      tap((result: any) => {
        localStorage.setItem(this.currentUserKey, JSON.stringify(result.user));
      })
    )
  }
  getCurrentUser() {
    const user = localStorage.getItem(this.currentUserKey);
    if(user){
      return user ? JSON.parse(user) : null; // Parse and return the user info

    }
  }

  logout() {
    localStorage.removeItem(this.currentUserKey);
  }

  isLoggedIn(): boolean {

    return !!localStorage.getItem('currentUser');
  }


  signUp(bodyData: any) {
    return this.http.post(`${this.baseUrl}/api/auth/register`, bodyData);
  }


  getAllUsers() {
    return this.http.get(`${this.baseUrl}/api/users/all`);
  }


  updateUserDetails(id: any, bodyData: any) {
    return this.http.put(`${this.baseUrl}/api/users/update/${id}`, bodyData);
  }

  getSingleUserApi(id: any) {

    return this.http.get(`${this.baseUrl}/api/users/single/${id}`);

  }

  deleteUserApi(id: any) {
    return this.http.delete(`${this.baseUrl}/api/users/delete-user/${id}`);
  }


  // Hotel Service Methods
  getHotels() {
    return this.http.get(`${this.baseUrl}/api/hotels`);
  }

  getHotelById(id: any) {
    return this.http.get(`${this.baseUrl}/api/hotels/${id}`);
  }

  addHotel(bodyData: any) {
    return this.http.post(`${this.baseUrl}/api/hotels`, bodyData);
  }

  updateHotel(id: string, bodyData: FormData) {
    return this.http.put(`${this.baseUrl}/api/hotels/${id}`, bodyData);
  }

  deleteHotel(id: string) {
    return this.http.delete(`${this.baseUrl}/api/hotels/${id}`);
  }

  // Booking Service Methods
  getBookings() {
    return this.http.get(`${this.baseUrl}/api/bookings`);
  }

  // getBookingById(id: string){
  //   return this.http.get(`${this.baseUrl}/api/bookings/${id}`);
  // }

  createBooking(bodyData: any) {
    return this.http.post(`${this.baseUrl}/api/bookings`, bodyData);
  }

  deleteBooking(id: any) {
    return this.http.delete(`${this.baseUrl}/api/bookings/${id}`);
  }

  currentBookingApi(id: any) {
    return this.http.get(`${this.baseUrl}/api/bookings/current/${id}`);
  }

  pastBookingsApi(id: any) {
    return this.http.get(`${this.baseUrl}/api/bookings/past/${id}`);
  }


  // review
  getReviewsByHotelId(id: any) {
    return this.http.get(`${this.baseUrl}/api/review/hotels/${id}`);
  }

  postReview(bodyData: any) {
    return this.http.post(`${this.baseUrl}/api/review`, bodyData);
  }

  updateHotelRating(hotelId: any, newRating: any) {
    return this.http.put(`${this.baseUrl}/api/review/hotels/updateRating`,  {hotelId, newRating} );
  }



  getBookingsByUserId(userId: any) {
    return this.http.get(`${this.baseUrl}/api/bookings/user/${userId}`);
  }

  // Get pending bookings by user ID
  getPendingBookingsByUserId(userId: any){
    return this.http.get(`${this.baseUrl}/api/bookings/user/${userId}/pending`);
  }

  // Get completed bookings by user ID
  getCompletedBookingsByUserId(userId: any) {
    return this.http.get(`${this.baseUrl}/api/bookings/user/${userId}/completed`);
  }

}
