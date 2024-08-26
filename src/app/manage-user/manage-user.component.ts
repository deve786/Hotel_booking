import { Component } from '@angular/core';
import { ApiServicesService } from '../allServices/api-services.service';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent {
  userDetails = {
    name: '',
    email: '',
    password:''
  };

  constructor(private apiService: ApiServicesService) { }

  ngOnInit(): void {
    // Optionally, fetch user details from the server here
    this.fetchUserDetails();
  }

  fetchUserDetails(): void {
    const userString = localStorage.getItem('currentUser');
    if (userString) {
      try {
        const user = JSON.parse(userString);
        this.userDetails = user; // Pre-fill the form with user details
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }

  saveDetails(): void {
    const userString = localStorage.getItem('currentUser');
    if (userString) {
      try {
        const user = JSON.parse(userString);
        const id = user.id; // Get user ID from local storage
        
        this.apiService.updateUserDetails(id, this.userDetails).subscribe({
          next: (response: any) => {
            console.log('User details updated successfully:', response);
            // Optionally, update the user in local storage
            localStorage.setItem('currentUser', JSON.stringify(response));
          },
          error: (err: any) => {
            console.error('Error updating user details:', err);
          }
        });
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    } else {
      console.error('No user found in localStorage');
    }
  }
}
