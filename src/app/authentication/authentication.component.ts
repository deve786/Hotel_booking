import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiServicesService } from '../allServices/api-services.service';
import { Router } from '@angular/router';  // Import Router

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent {
  currentForm: string = 'signIn';

  constructor(private fb: FormBuilder, private as: ApiServicesService, private router: Router) { }  // Inject Router

  registerForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
    email: ["", [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]],
    password: ["", [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')]]
  });

  register() {
    if (this.registerForm.valid) {
      const path = this.registerForm.value;
      this.as.signUp({ name: path.name, email: path.email, password: path.password }).subscribe((result: any) => {
        // console.log(result);
        this.registerForm.reset();
        alert("Successfully Added");
      });
    } else {
      alert("Invalid Forms");
    }
  }

  login() {
    if (this.registerForm.value) {
      const path = this.registerForm.value;
      this.as.signIn({ email: path.email, password: path.password }).subscribe((result: any) => {
        // console.log(result);
        this.registerForm.reset();

        // Check if the user is an admin
        if (result.user.isAdmin) {
          // Navigate to the admin route
          this.router.navigate(['/admin']);
        } else {
          // Navigate to the user route or dashboard
          this.router.navigate(['/dashboard']);
          
        }
        
        alert("Login Successfully");
      });
    } else {
      alert("Invalid Forma");
    }
  }

  toggleForm(form: string): void {
    this.currentForm = form;
  }
}
