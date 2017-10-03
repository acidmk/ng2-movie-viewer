import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromRoot from './reducers';

import * as movie from './actions/movie';
import { Movie } from './models/movie';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  query = '';
  movies$: Observable<Movie[]>;
  selectedMovie$: Observable<Movie>;
  currentQuery$: Observable<string>;
  
  constructor(private store: Store<fromRoot.State>) {
    this.movies$ = store.select(fromRoot.getMovieEntities);     
    this.selectedMovie$ = store.select(fromRoot.getSelectedMovie);
    this.currentQuery$ = store.select(fromRoot.getQuery);

    this.currentQuery$.subscribe(res => {
      this.query = res;
    });

    store.dispatch(new movie.GetPopularAction()); 
  }

  select(entity: Movie) {
    this.store.dispatch(new movie.SelectAction(entity));
  }

  search(value: string) {
    if(value == this.query) {
      return;
    }

    console.log(value);
    if(value !== '') {
      this.store.dispatch(new movie.SearchAction(value));
    } else {
      this.store.dispatch(new movie.GetPopularAction());
    }
  }
}
