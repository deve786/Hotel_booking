import { Component } from '@angular/core';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent {
  userDetails = {
    name: '',
    email: '',
    phone: ''
  };

  constructor() { }

  ngOnInit(): void {
    // Optionally, fetch user details from the server here
  }

  saveDetails(): void {
    // Handle the form submission here
    console.log('User details saved:', this.userDetails);
    // Here you might call a service to save the details
    // Example:
    // this.userService.updateUserDetails(this.userDetails).subscribe(response => {
    //   console.log('Details saved successfully');
    // });
  }
}
