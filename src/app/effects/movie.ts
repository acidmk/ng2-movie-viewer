import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';
import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';
import { defer } from 'rxjs/observable/defer';

import { MovieDbService } from '../services/movie-db';
import * as movie from '../actions/movie';

@Injectable()
export class MovieEffects {
    constructor(private actions$: Actions, private service: MovieDbService) { }

    @Effect()
    getPopular$: Observable<Action> = this.actions$
      .ofType<movie.GetPopularAction>(movie.GET_POPULAR)
      .map(toPayload)
      .switchMap(() => {
        return this.service.getPopularMovies()        
            .map(movies => new movie.LoadCompleteAction(movies))
            .catch(() => of(new movie.LoadCompleteAction([])));
    });

    @Effect()
    search$: Observable<Action> = this.actions$
      .ofType<movie.SearchAction>(movie.SEARCH)
      .debounceTime(300)
      .map(action => action.payload)
      .switchMap(query => {
        if (query === '') {
          return empty();
        }
  
       const nextSearch$ = this.actions$.ofType(movie.SEARCH).skip(1);
  
        return this.service.searchMovies(query)
         .takeUntil(nextSearch$)
          .map(movies => new movie.SearchCompleteAction(movies))
          .catch(() => of(new movie.SearchCompleteAction([])));
    });
    
}
