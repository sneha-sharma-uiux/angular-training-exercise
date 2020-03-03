import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { Character } from '../../models/character';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-filter-area',
  templateUrl: './filter-area.component.html',
  styleUrls: ['./filter-area.component.scss']
})
export class FilterAreaComponent implements OnInit {
  
 
  
  constructor(private homeservice:HomeService) { }

  ngOnInit() {
    
    
  }
  

}
