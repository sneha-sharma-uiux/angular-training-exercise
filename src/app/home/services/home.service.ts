import { Injectable } from '@angular/core';
import { environment } 
        from './../../../environments/environment';

import { Character } from './../models/character';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class HomeService implements Character {
  id: number;
  name: string;
  status: boolean;
  species: string;
  gender: string;
  location: { name: string; url: string; };
  origin: { name: string; url: string; };
  

  constructor(private http: HttpClient) { }

   // GET /api/products
   getDataList(): Observable<Character[]> {
    //FIXME: implement get api for products
return this.http.get<Character[]>(`${environment.apiEndPoint}/results`);
  map(res => res['shows']);
}
getData(id: any): Observable<Character> {
  return this.http
        .get<Character>(`${environment.apiEndPoint}/results/${id}`);
}


searchProducts(name: string): Observable<Character[]> {
  return this.http.get<Character[]>(`${environment.apiEndPoint}/results?name=${name}`);
}

}
