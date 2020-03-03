import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { Observable } from 'rxjs';
import { Character } from '../../models/character';
import { FormBuilder, FormControl, FormGroup, FormsModule } from "@angular/forms"; // formgroup:group of form controls
import { map,filter,debounceTime } from "rxjs/operators";
import { SortPipe } from "../../../shared/pipes/sort.pipe";

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
  sortControl:FormControl;
  Desc:string;

  character$:Observable<Character[]>
  character:Character[];

  genders:string[];
  //species:string[];
  origins:string[];
  gendersChecked:string[]=[];
  speciesChecked:string[]=[];
  originChecked:string[] =[];

  constructor( private homeService:HomeService, private builder:FormBuilder) { 
    this.searchControl=new FormControl(); // value will be initialised on form since it is in constructor
    this.sortControl= new FormControl();
      this.group=this.builder.group({
        //html binding name:control object
        'search':this.searchControl,
        'sort':this.sortControl
      });
  }
  reset(){
    this.searchControl.setValue('');
  }
  search(){
    this.character$=this.homeService.searchData(this.searchControl.value);
    
  }
  getData(){
    this.character$=this.homeService.getDataList();
  }
  sortCharacters(e): void {
        this.sortControl
          .valueChanges
          .subscribe(() => {
            this.Desc = e.target.value;
          })
      }

  ngOnInit() {
    this.getData();
    // this.character$.subscribe((value:Character[])=>{
    //   this.character=value;
    //   //console.log(value);
    // });

    this.searchControl
      .valueChanges
      .pipe(filter(value => !value))// empty strings are true
      .subscribe(() =>{
        this.getData();
      }) 

this.character$.subscribe(value =>

  {
    //console.log(data.results);
    //this.shows = data.results;
    this.genders = value.map(x=>x.gender).filter(function(v,i,self) { return self.indexOf(v) == i; });
    this.gendersChecked= [...this.genders];
    this.species = value.map(x=>x.species).filter(function(v,i,self) { return self.indexOf(v) == i; });
    this.speciesChecked =[...this.species];
    this.origins = value.map(x=>x.origin.name).filter(function(v,i,self) { return self.indexOf(v) == i; });
    this.originChecked =[...this.origins];
    console.log(this.origins);
    console.log(this.species);
  });
    
  }

  ongenderChange(gender:string, isChecked: boolean,index:number){
    if(isChecked && this.gendersChecked.indexOf(gender) ===-1) {
      this.gendersChecked = [...this.gendersChecked,gender];
      console.log('lll',this.gendersChecked)
    } else if(this.gendersChecked.indexOf(gender) >-1){
      let i =this.gendersChecked.findIndex(x=>x=== gender);
      this.gendersChecked.splice(i,1);
    }
    console.log('666',this.gendersChecked)
  }
  onSpeciesChange(species:string, isChecked: boolean,index:number){
    if(isChecked && this.speciesChecked.indexOf(species) ===-1) {
      this.speciesChecked = [...this.speciesChecked,species];
    } else if(this.speciesChecked.indexOf(species) >-1){
      let i =this.speciesChecked.findIndex(x=>x=== species);
      this.speciesChecked.splice(i,1);
    }
  }
  onoriginChange(origin:string, isChecked: boolean,index:number){
    if(isChecked && this.originChecked.indexOf(origin) ===-1) {
      this.originChecked = [...this.originChecked,origin];
    } else if(this.originChecked.indexOf(origin) >-1){
      let i =this.originChecked.findIndex(x=>x=== origin);
      this.originChecked.splice(i,1);
    }
  }

}
