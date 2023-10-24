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
  jwtToken: string = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2OTgxMzkzOTMsImV4cCI6MTY5ODE0Mjk5Mywicm9sZXMiOlsiUk9MRV9BRE1JTiIsIlJPTEVfVVNFUiJdLCJ1c2VybmFtZSI6ImFkbWluIn0.P0qfLKl-wFaYv6-4BbXo0Gh_bzrRFyc53FF5ZS4lWj9uNVBc_SHqD9fwkfVagvehIHndI74x3WMdl-Aa-yP3QmpsB-eKMvrZHeSuiOgtOFmnBdzQgweO5yOpSt4JJgNycPFoVMcZxEmOIKRgAtPPEqIvmnj41_HfJkEG9rsgT2-I6_Ls9HY7W_7EJbkqI1aNjqAx0d5RG0Kw3MANFnPcXExNQWqi1DQBcRyHcUdaxpAUPSfYBy82_1Qhmi7c9KgMZhZ58QAGgVNZD6yc-wjHUMi391dbkKKkFediQeFQIP5zqOXV1g3JNloHlvQAU_ddJ-MIneMqAR5tl48QHYNLLg"; // Replace with your actual JWT token


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
