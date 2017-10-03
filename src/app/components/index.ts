import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MovieListComponent } from './movie-list/movie-list';
import { MovieListItemComponent } from './movie-list/movie-list-item';
import { MovieDetailsComponent } from './movie-details/movie-details';
import { MovieDetailsRating } from './movie-details/movie-details-rating';
import { MovieSearchComponent } from './movie-search/movie-search';

export const COMPONENTS = [
    MovieListComponent,
    MovieListItemComponent,
    MovieDetailsComponent,
    MovieDetailsRating,
    MovieSearchComponent
];


@NgModule({
  imports: [
    CommonModule,
    NgbModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class ComponentsModule { }
