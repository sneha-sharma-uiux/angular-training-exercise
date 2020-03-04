import { Component, OnInit } from '@angular/core';
import { filter, startWith } from 'rxjs/operators';
import { of } from 'rxjs';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { HomeService } from '../../services/home.service';
import { Character } from '../../models/character';

@Component({
  selector: 'app-character-home',
  templateUrl: './character-home.component.html',
  styleUrls: ['./character-home.component.scss']
})
export class CharacterHomeComponent implements OnInit {
  characters$: Character[];
  form: FormGroup;
  searchControl: FormControl;
  sortControl: FormControl;

  constructor(private homeService: HomeService, private formBuilder: FormBuilder) {
    this.searchControl = new FormControl("");
    this.sortControl = new FormControl("");
    this.form = this.formBuilder.group({
      'search': this.searchControl,
      'sort': this.sortControl
    })
  }

  searchCharacter(): void {
    this.homeService.getUpdatedSearchData(this.searchControl.value);
  }

  sortCharacters(e): void {
    this.sortControl
      .valueChanges
      .pipe(startWith(null))
      .subscribe((value) => {
        this.homeService.typeSort = e.target.value;
      })
  }

  ngOnInit(): void {
    this.searchControl
      .valueChanges
      .pipe(filter(value => !value))// empty strings are true
      .subscribe(() => {
        of(this.characters$).subscribe(() => this.homeService.getUpdatedData());
      })
  }

}
