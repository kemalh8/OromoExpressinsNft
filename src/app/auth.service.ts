import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string | null = null;

  constructor(private http: HttpClient) {
    // Check if a token is already stored
    this.token = localStorage.getItem('authToken');
  }

  login(username: string, password: string): Observable<boolean> {
    // Define the authentication endpoint URL
    const authEndpoint = 'https://127.0.0.1:8000/auth';
  
    // Create an object with the user's credentials
    const credentials = { username, password };
  
    // Send a POST request to the authentication endpoint with the credentials
    return this.http.post(authEndpoint, credentials).pipe(
      map((data: any) => {
        if (data.token) {
          // If the backend returns a token, store it securely in HttpOnly cookies
          this.token = data.token;
  
          // Store the token in localStorage (temporarily) if it's not null
          if (this.token) {
            localStorage.setItem('authToken', this.token);
          }
  
          return true; // Authentication was successful
        } else {
          return false; // Authentication failed
        }
      })
    );
  }
  

  logout(): void {
    // Clear the token and log the user out
    this.token = null;
    localStorage.removeItem('authToken');
  }

  isAuthenticated(): boolean {
    // Check if the user is authenticated based on the token
    return !!this.token;
  }

  getToken(): string | null {
    return this.token;
  }
}
