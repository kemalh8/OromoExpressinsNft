import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Nft } from '../nft';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class NftService {
  apiUrl: string = "https://127.0.0.1:8000/api/nfts";
  jwtToken: string = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2OTk0MzU4ODIsImV4cCI6MTY5OTQzOTQ4Miwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoiU2VpZnUifQ.U2ApDnwvC2zk_pX5UsGk7f8jsOkOYWF0PzOeXQdDtl_Y1nZJhBl-GLrd3qbBDbTDqQE5OJjl9IHFMLuzJNcJRMqBBJ5aiarAYq7hB4i7Q2W6LvW4cg6KnB3aH0mbBNJwftjjxGaUw15ZPir0nGWK5KQEwiXBYza1SOUXluTWnEizUDdiVzM5ZFbqoZdsX7bXcOd0m-kbo8cQOoYQ9E074gBTHUFyEpfaMJ3j6Mh1pOMcD000fLuZkMXcMX59d0DxB66b0k-eeOTFPzRuQhb7aifEsHVJaGL5rmrlkEoqiQ8YQIXNNixaitzdxVE596q0LFtQaS1aOQzf5WycnbkInw"; // Replace with your actual JWT token


  constructor(private http: HttpClient) { }
  

  getAll(): Observable<Nft[]> { // Return type should be Observable<Nft[]>
      // JWT token in the request headers
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.jwtToken}`
      });
    return this.http.get<Nft[]>(this.apiUrl + ".json", {headers});
    //return this.http.get<Nft[]>(this.apiUrl, { headers });
  }

  getOne(id: number): Observable<Nft>{
    // Include JWT token in the request headers
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.jwtToken}`
    });
    return this.http.get<Nft>(this.apiUrl + "/" + id + ".json",{ headers } );
  }


    //it calls my service and makes a post request. as soon as there is a return, it will redirect user to the listing
      add(formData: FormData): Observable<Nft> {
        // Include JWT token in the request headers
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${this.jwtToken}`
        }).set('Content-Type', 'application/json'); // Change content type to application/json
      
        return this.http.post<Nft>(this.apiUrl + ".json", formData, { headers });
      }
      
      
      
      remove(id: number): Observable<Nft>{
        const url = `${this.apiUrl}/${id}.json`;

         // Include JWT token in the request headers
         const headers = new HttpHeaders({
          'Authorization': `Bearer ${this.jwtToken}`
        });

        return this.http.delete<Nft>(url, { headers }).pipe(
          catchError((error: HttpErrorResponse) => {
            console.error('Error deleting NFT:', error);
            return throwError(() => new Error('An error occured while deleting the NFT'));
          })
        );
      }


/*
  updatePut(id: number, nft: Nft): Observable<Nft> {
  const url = `${this.apiUrl}/${id}.json`;
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.jwtToken}`,
    'Content-Type': 'application/json', // Assuming you are sending JSON data
  });

  return this.http.put<Nft>(url, nft, { headers });
}

updatePatch(id: number, nft: Nft): Observable<Nft> {
  const url = `${this.apiUrl}/${id}.json`;
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.jwtToken}`,
    'Content-Type': 'application/json', // Assuming you are sending JSON data
  });

  return this.http.patch<Nft>(url, nft, { headers });
}
*/
  
}
