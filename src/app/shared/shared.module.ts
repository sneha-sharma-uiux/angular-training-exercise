import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipe } from './pipes/filter.pipe';
import { SortPipe } from './pipes/sort.pipe';
import { LastCreatedPipe } from './pipes/last-created.pipe';

@NgModule({
  declarations: [FilterPipe, SortPipe, LastCreatedPipe],
  imports: [
    CommonModule
  ],
  exports:[FilterPipe, SortPipe,LastCreatedPipe]
})
export class SharedModule { }
