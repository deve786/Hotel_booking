import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiServicesService } from '../allServices/api-services.service';

@Component({
  selector: 'app-user-mangement',
  templateUrl: './user-mangement.component.html',
  styleUrls: ['./user-mangement.component.css']
})
export class UserMangementComponent {
  users: any = [];
  

  constructor(private fb:FormBuilder,private as:ApiServicesService) { }

  userForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['']
  });


  ngOnInit(): void {
    this.getUsers()
  }

  getUsers() {
    this.as.getAllUsers().subscribe(
      (result: any) => {
        this.users = result; 
        // console.log(result);
        // Store fetched users in the `users` array
      },
      error => {
        console.error('Error fetching users', error); // Handle errors
      }
    );
  }

  deleteUser(id:any){
    this.as.deleteUserApi(id).subscribe(
      (result: any) => {
        
        alert("Delete Sucessfully")
        this.getUsers()
      },
      error => {
        console.error('Error fetching users', error); // Handle errors
      }
    );
  }
}
