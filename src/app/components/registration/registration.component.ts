import { Component } from '@angular/core';
import { RegistrationService } from '../../services/registration.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  registrationForm: FormGroup;

  constructor(private registrationService: RegistrationService, private fb: FormBuilder) {
    this.registrationForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      birthdate: [''],
      address: ['']
    });
  }

  // Method to handle user registration
  registerUser(): void {
    if (this.registrationForm.valid) {
      // Create a user object with the form data
      const userData = {
        username: this.registrationForm.value.username,
        email: this.registrationForm.value.email,
        password: this.registrationForm.value.password,
        lastName: this.registrationForm.value.lastName,
        birthdate: this.registrationForm.value.birthdate,  
        address: this.registrationForm.value.address
      };

      // Call the registration service to register the user
      this.registrationService.registerUser(userData).subscribe(
        (response) => {
          // Handle successful registration
          console.log('User registered:', response);
        },
        (error) => {
          // Handle registration error
          console.error('Registration error:', error);
        }
      );
    } else {
      // Form is not valid, display validation errors or take other actions
    }
  }
}
