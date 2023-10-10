import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Nft } from '../nft';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class NftService {
  apiUrl: string = 'https://127.0.0.1:8000/api/nfts';
  jwtToken: string = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2OTY5MzY0OTEsImV4cCI6MTY5Njk0MDA5MSwicm9sZXMiOlsiUk9MRV9BRE1JTiIsIlJPTEVfVVNFUiJdLCJ1c2VybmFtZSI6ImFkbWluIn0.nQDmLsNi-rp3yj0sU6GJq7lzhsKOirCUKq3kdWiYezj2mK3qgf_VqFgPag3VeUP3Bo6QlCaR7xx5-OUIk4G6mLEiWDIPcHKofwwfh2VDJgY3ul6ag0x7laNwXhBzamqK2-FKnuAMM6aTY8nKVuzztuTkyGsd8zrJj1J6RbS3hXc1QVyF1wUPWpd_zhq02UxiA00m3WinAqpdXkQ-gQpt-GV7lbJg-E7MF2PJ2nYf-SHTES-1XrA24EVuxs1nMkbLoiGmdwpcjAg7s9HpIVMWmHZMdfJwiwfEzGMsivD6BqgcxTgBCTHqQuMXfbK6Xvtu9EMBnogA-TnQT58FDhoubw'; // Replace with your actual JWT token


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



      //   il va aller appeler mon service et faire une requette post. dès qu'il y aura eu une retour, il rediregera utilisateur vers la listing
      add(nft: Nft, formData: FormData): Observable<Nft> {
        // Include JWT token in the request headers
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${this.jwtToken}`
        });
         // Append the Content-Type header for FormData
          headers.append('Content-Type', 'multipart/form-data');
        return this.http.post<Nft>(this.apiUrl, nft, { headers: headers });
      }
      

  /*getOne(id: number): Observable<Nft> {
    // Include JWT token in the request headers
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.jwtToken}`
    });
    // Construct the URL for the specific NFT using the provided ID
    const specificNftUrl = `${this.apiUrl}/${id}.json`;
    return this.http.get<Nft>(specificNftUrl, { headers });
  }*/
  
}
