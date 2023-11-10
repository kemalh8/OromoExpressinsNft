import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginError: string = '';


  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  ngOnInit(): void {
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const username = this.loginForm.get('username')!.value;
      const password = this.loginForm.get('password')!.value;

      // Call the login method from your authentication service
      this.authService.login(username, password).subscribe((success) => {
        if (success) {
          // Login was successful, you can redirect to a different page or perform other actions here
          this.loginError = 'Login successful';
          console.log('Login successful');
        } else {
          // Login failed, show an error message or handle it as needed
          this.loginError = 'Login failed. Please check your credentials.';
          console.error('Login failed');
        }
      });
    }
  }
}
