import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Character } from '../../models/character';

@Component({
  selector: 'app-filter-area',
  templateUrl: './filter-area.component.html',
  styleUrls: ['./filter-area.component.scss']
})
export class FilterAreaComponent implements OnInit {
  characters$: Character[];
  form: FormGroup;
  filterControl: FormControl;
  genders: string[];
  species: string[];
  origins: string[];
  gender: string[]
  speciesChecked: string[];
  gendersChecked: string[];
  originChecked: string[];
  filterKey: string;

  constructor(private homeService: HomeService, private formBuilder: FormBuilder) {
    this.filterControl = new FormControl(true);
    this.form = this.formBuilder.group({
      'filter': this.filterControl
    })
  }

  checked(key, value, event) {
    this.filterControl
      .valueChanges
      .pipe(startWith(null))
      .subscribe(() => {
        this.filterKey=key;
        if (key == 'gender') {
          if (event.target.checked && this.gendersChecked.indexOf(value) === -1) {
            this.gendersChecked = [...this.gendersChecked, value]
          } else if (!event.target.checked && this.gendersChecked.indexOf(value) > -1) {
            let i = this.gendersChecked.findIndex(x => x === value);
            this.gendersChecked.splice(i, 1);
          }
        }
        else if (key == "species") {
          if (event.target.checked && this.speciesChecked.indexOf(value) === -1) {
            this.speciesChecked = [...this.speciesChecked, value]
          } else if (!event.target.checked && this.speciesChecked.indexOf(value) > -1) {
            let i = this.speciesChecked.findIndex(x => x === value);
            this.speciesChecked.splice(i, 1);
          }
        }
        else if (key == "origin") {
          if (event.target.checked && this.originChecked.indexOf(value) === -1) {
            this.originChecked = [...this.originChecked, value]
          } else if (!event.target.checked && this.originChecked.indexOf(value) > -1) {
            let i = this.originChecked.findIndex(x => x === value);
            this.originChecked.splice(i, 1);
          }
        }
      })
      this.homeService.genderItems = this.gendersChecked;
      this.homeService.speciesItems = this.speciesChecked;
      this.homeService.originItems = this.originChecked;
  }

  ngOnInit(): void {
    this.homeService.getData().subscribe(value => {
      this.genders = value
        .map(x => x.gender)
        .filter(function (v, i, self) {
          return self.indexOf(v) == i;
        });
      this.gendersChecked = [...this.genders];
      this.species = value
        .map(x => x.species)
        .filter(function (v, i, self) {
          return self.indexOf(v) == i;
        });
      this.speciesChecked = [...this.species];
      this.origins = value
        .map(x => x.origin.name)
        .filter(function (v, i, self) {
          return self.indexOf(v) == i;
        });
      this.originChecked = [...this.origins];
    })
  }
  

}
