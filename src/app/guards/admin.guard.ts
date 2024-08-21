import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ApiServicesService } from '../allServices/api-services.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private apiService: ApiServicesService, private router: Router) { }

  canActivate(): boolean {
    const currentUser = this.apiService.getCurrentUser(); // Retrieve the current user (implement this method in your service)
    
    if (currentUser && currentUser.isAdmin) {
      return true; // Allow access to the route
    } else {
      this.router.navigate(['/dashboard']); // Redirect to user dashboard if not an admin
      return false;
    }
  }
}
