import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { Observable } from 'rxjs';
import { Character } from '../../models/character';
import { FormBuilder, FormControl, FormGroup } from "@angular/forms"; // formgroup:group of form controls
import { map,filter,debounceTime } from "rxjs/operators";

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.scss']
})
export class HomeListComponent implements OnInit, Character {
  id: number;
  name: string;
  status: boolean;
  species: string;
  gender: string;
  location: { name: string; url: string; };
  origin: { name: string; url: string; };
  searchText:string;

  group:FormGroup; // form
  searchControl:FormControl; // input box

  character$:Observable<Character[]>
  character:Character[];

  constructor( private homeService:HomeService, private builder:FormBuilder) { 
    this.searchControl=new FormControl(''); // value will be initialised on form since it is in constructor

      this.group=this.builder.group({
        //html binding name:control object
        'search':this.searchControl
      });
  }
  reset(){
    this.searchControl.setValue('');
  }

  ngOnInit() {
    this.character$=this.homeService.getDataList();
    // this.character$.subscribe((value:Character[])=>{
    //   this.character=value;
    //   //console.log(value);
    // });

    this
    .searchControl
    .valueChanges
    .pipe(filter(value => !!value)) //non empty strings are true
    .pipe(map(value => value.trim().toLowerCase()))
    .pipe(debounceTime(500))
    .subscribe(value =>{
      console.log('*'+value+'*');
      this.searchText=value;
      this.character$=this.homeService.searchProducts(this.searchText);
    })
  }

}
