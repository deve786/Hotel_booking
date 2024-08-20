import { Component } from '@angular/core';

@Component({
  selector: 'app-user-mangement',
  templateUrl: './user-mangement.component.html',
  styleUrls: ['./user-mangement.component.css']
})
export class UserMangementComponent {
  users: any[] = []; // Define the users property

  constructor() { }

  ngOnInit(): void {
    // Call a method to load users data
    this.loadUsers();
  }

  // Method to fetch users data
  loadUsers(): void {
    // Sample data; replace with actual data fetching logic
    this.users = [
      { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
      { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
      // Add more sample users as needed
    ];
  }
}
