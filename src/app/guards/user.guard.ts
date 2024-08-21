import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ApiServicesService } from '../allServices/api-services.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(private apiService: ApiServicesService, private router: Router) { }

  canActivate(): boolean {
    const currentUser = this.apiService.getCurrentUser(); // Retrieve the current user

    if (currentUser && !currentUser.isAdmin) {
      return true; // Allow access to the route
    } else {
      this.router.navigate(['/admin']); // Redirect to admin route if not a regular user
      return false;
    }
  }
}
