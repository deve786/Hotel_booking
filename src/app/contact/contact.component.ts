import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  name: string = '';
  email: string = '';
  message: string = '';
  successMessage: string = '';
  errorMessage: string = '';

  constructor() {}

  // onSubmit(contactForm: NgForm) {
  //   if (contactForm.valid) {
  //     // Simulate sending form data to a server
  //     this.sendContactData(this.name, this.email, this.message)
  //       .then(response => {
  //         // On successful submission
  //         this.successMessage = 'Your message has been sent successfully!';
  //         contactForm.reset(); // Reset form fields
  //       })
  //       .catch(error => {
  //         // On failure
  //         this.errorMessage = 'There was an error sending your message. Please try again later.';
  //       });
  //   } else {
  //     this.errorMessage = 'Please fill in all required fields.';
  //   }
  // }

  // private sendContactData(name: string, email: string, message: string): Promise<any> {
  //   // Replace this with actual HTTP request logic
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       // Simulate a successful response
  //       resolve({ success: true });
  //     }, 1000);
  //   });
  // }
}
