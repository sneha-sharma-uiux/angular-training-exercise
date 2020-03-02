import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeListComponent } from './components/home-list/home-list.component';
import { HttpClientModule } from '@angular/common/http';
import { CharacterHomeComponent } from './components/character-home/character-home.component';
import { FilterAreaComponent } from './components/filter-area/filter-area.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [HomeListComponent, CharacterHomeComponent, FilterAreaComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[HomeListComponent,CharacterHomeComponent, FilterAreaComponent]
})
export class HomeModule { }
