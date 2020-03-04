import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { Observable, Subscription } from 'rxjs';
import { Character } from '../../models/character';
import { FormBuilder, FormControl, FormGroup, FormsModule } from "@angular/forms"; // formgroup:group of form controls
import { map,filter,debounceTime } from "rxjs/operators";
import { SortPipe } from "../../../shared/pipes/sort.pipe";

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.scss']
})
export class HomeListComponent implements OnInit{
  characters$: Character[];
  charactersSubscription: Subscription;
  typeSortSubscription:Subscription;
  genderSubscription:Subscription;
  speciesSubscription:Subscription;
  originSubscription:Subscription;
  filterKeySubscription: Subscription;
  typeSort:string;
  filterItems:string[];
  form: FormGroup;
  sortControl: FormControl;
  filterControl: FormControl
  genderItems: string[];
  speciesItems: string[];
  originItems: string[];
  filterKey: string;
  
  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.homeService.getUpdatedData();
    this.charactersSubscription = this.homeService.character$.subscribe((value: Character[]) => {
      this.characters$ = value
    });
    this.typeSortSubscription=this.homeService.typeSort$.subscribe((value:string)=>{
      this.typeSort = value
    });
    this.genderSubscription = this.homeService.genderItems$.subscribe((value:string[])=>{
      this.genderItems=value
    });
    this.speciesSubscription = this.homeService.speciesItems$.subscribe((value:string[])=>{
      this.speciesItems=value
    });
    this.originSubscription = this.homeService.originItems$.subscribe((value:string[])=>{
      this.originItems=value
    });
    this.filterKeySubscription = this.homeService.filterKey$.subscribe((value:string)=>{
      this.filterKey=value
    });
  }

}
