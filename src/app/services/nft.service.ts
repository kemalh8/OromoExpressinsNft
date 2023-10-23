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
  jwtToken: string = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2OTgwNjkyMzUsImV4cCI6MTY5ODA3MjgzNSwicm9sZXMiOlsiUk9MRV9BRE1JTiIsIlJPTEVfVVNFUiJdLCJ1c2VybmFtZSI6ImFkbWluIn0.ddbM9MbQxhyoqNk1j700sWK4AQHOnrxgctCB86smgMJJ0UxEot1R3Hql-7yyMWlhO4L5_uPdkJ_l7EVGUmHvTxFricuI2QoztFXGzuJdqMykGcbmaJ6b7A0-uMl3Yrb0jhUEeBtju1mXSpVkQpt3KkDHzdBsVq_djylhGhAGT1nnRVFuife0AN6JcIhuBxY4CyTU5o14Mgr94u23OcxWbt3QlyzB0Xmfz7KndkZW3tpn3G-z9ar0zr_43GQGFpL-cwV02buQWRsBHakyw9aPsRrA3EDHDKMUDKfZD6S_OG_kbLveHWocsLlyTb_eGYTIsxinQspadK3pbT5OLcgCjw"; // Replace with your actual JWT token


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
