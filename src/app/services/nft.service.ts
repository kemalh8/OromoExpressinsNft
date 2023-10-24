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
  jwtToken: string = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2OTgxMzI5NDEsImV4cCI6MTY5ODEzNjU0MSwicm9sZXMiOlsiUk9MRV9BRE1JTiIsIlJPTEVfVVNFUiJdLCJ1c2VybmFtZSI6ImFkbWluIn0.T_0rvKmzdO2v1MttQLVWkrg12HLF06j1Wfi6xFyrSh0M-6eOhqQx6ImuMYmpR5gHC7q-4ChQWnLKYElVzl9uJn6Y1WudEWH0R4jDfAr00fjldEE_WTL6F5dxxgXR9FKJiR_-duj6M8pzKjH61z5StbHQHD-rSSR8JNRRN0qNVx8uR2RWqno2yclg5AOWB6CS35O6P5tlahnnSCZbWdeVantyPlxW9DdLwJ6GImofM6ZLzQ8cp_XDmvmMDEFXgo-r0O5kQNNmmyQ_P0JgfEYv1Zu4fBg1t_fI8TMTuGGe0pICCqj_vVggZeEJhJn40kFxvkcE8EnvF3-a8McbFE_BMg"; // Replace with your actual JWT token


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
