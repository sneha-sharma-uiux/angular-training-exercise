import { Injectable } from '@angular/core';
import { environment } 
        from './../../../environments/environment';

import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, catchError } from "rxjs/operators";
import { Character } from '../models/character';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private _typeSort:string;
  private _originItems:string[];
  private _speciesItems:string[];
  private _genderItems:string[];
  
  public character$: BehaviorSubject<Character[]> = new BehaviorSubject(null);
  public typeSort$: BehaviorSubject<string> = new BehaviorSubject(null);
  public originItems$: BehaviorSubject<string[]> = new BehaviorSubject(null);
  public speciesItems$: BehaviorSubject<string[]> = new BehaviorSubject(null);
  public genderItems$: BehaviorSubject<string[]> = new BehaviorSubject(null);
  public filterKey$: BehaviorSubject<string> = new BehaviorSubject(null);

  get typeSort() {
    return this._typeSort;
  }

  set typeSort(value: string) {
    this._typeSort = value;
    this.typeSort$.next(this._typeSort);
  }

  get originItems(){
    return this._originItems;
  }
  
  set originItems(value:string[]){
    this._originItems=value;
    this.originItems$.next(this._originItems);
  }


  get speciesItems(){
    return this._speciesItems;
  }

  set speciesItems(value: string[]) {
    this._speciesItems = value;
    this.speciesItems$.next(this._speciesItems);
  }
  
  get genderItems(){
    return this._genderItems;
  }

  set genderItems(value: string[]) {
    this._genderItems = value;
    this.genderItems$.next(this._genderItems);
  }

  constructor(private http: HttpClient) { }

  getData(): Observable<Character[]> {
    return this.http.get<Character[]>(`${environment.apiEndPoint}/results`);
  }

  searchData(name: string): Observable<Character[]> {
    return this.http.get<Character[]>(`${environment.apiEndPoint}/results?name=${name}`);
  }

  getUpdatedSearchData(value:string) {
    this.searchData(value).subscribe((data: any) => {
      this.character$.next(data);
    });
  }

  getUpdatedData(){
    this.getData().subscribe((data: any) => {
      this.character$.next(data);
    });
  }
}
