import { Component, OnInit } from '@angular/core';
import { ApiServicesService } from '../allServices/api-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  currentUserName: string | null = null;
  isLoggedIn: boolean = false;

  constructor(private apiService: ApiServicesService, private router: Router) { }

  ngOnInit(): void {
    this.checkLoginStatus();
    this.getUserName();
  }

  // Check if the user is logged in
  checkLoginStatus(): void {
    this.isLoggedIn = this.apiService.isLoggedIn(); // Adjust this method as needed
  }

  // Get the current user's name
  getUserName(): void {
    if (this.isLoggedIn) {
      const user = this.apiService.getCurrentUser();
      this.currentUserName = user ? user.name : null;
    } else {
      this.currentUserName = null; // Clear the user name if not logged in
    }
  }

  // Handle logout
  logout(): void {
    this.apiService.logout(); // Clear user data
    this.checkLoginStatus(); // Update login status
    this.currentUserName = null; // Clear user name
    this.router.navigate(['/']); // Redirect to the home page or login page
  }
}
