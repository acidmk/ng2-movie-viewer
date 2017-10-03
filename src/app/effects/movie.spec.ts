import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { provideMockActions } from '@ngrx/effects/testing';
import { hot, cold } from 'jasmine-marbles';
import * as movie from '../actions/movie';
import { MovieEffects } from './movie';
import { MovieDbService } from '../services/movie-db';
import { Movie } from '../models/movie';

describe('MoviesEffects', () => {
  let effects: MovieEffects;
  let actions$: Observable<any>;
  let movieDbService: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MovieEffects,
        provideMockActions(() => actions$),
        {
            provide: MovieDbService,
            useValue: jasmine.createSpyObj('MovieDbService', ['getPopularMovies', 'searchMovies'])
        }
      ],
    });

    spyOn(Observable.prototype, 'debounceTime').and.callFake(function () {
        return this
    });
 
    effects = TestBed.get(MovieEffects);
    movieDbService = TestBed.get(MovieDbService);
    actions$ = TestBed.get(Actions);
  });

  describe('getPopularMovies$', () => {
    it('should return a new movies.LoadCompleteAction, with the movies, on success', () => {
        const movie1 = { id: '111', original_title: "test", poster_path: "a", overview: "aaa", vote_average: 7.0 } as Movie;
        const movie2 = { id: '222', original_title: "test1", poster_path: "b",  overview: "bbb", vote_average: 5.0 } as Movie;
        const movies = [movie1, movie2];
        const action = new movie.GetPopularAction();
        const completion = new movie.LoadCompleteAction(movies);

        actions$ = hot('-a-', { a: action });

        const response = cold('-a', { a: movies });
        const expected = cold('--b', { b: completion });
        movieDbService.getPopularMovies.and.returnValue(response);

        expect(effects.getPopular$).toBeObservable(expected);
    });

    it('should return a new movies.LoadCompleteAction, with an empty array, if the movies service throws', () => {
        const action = new movie.GetPopularAction();
        const completion = new movie.LoadCompleteAction([]);
        const error = 'Error!';
  
        actions$ = hot('-a---', { a: action });
        const response = cold('-#', {}, error);
        const expected = cold('--b', { b: completion });
        movieDbService.getPopularMovies.and.returnValue(response);
  
        expect(effects.getPopular$).toBeObservable(expected);
    });
  });

  describe('search$', () => {
    it('should return a new movie.SearchCompleteAction, with the movies, on success, after the de-bounce', () => {
        const movie1 = { id: '111', original_title: "test", poster_path: "a", overview: "aaa", vote_average: 7.0 } as Movie;
        const movie2 = { id: '222', original_title: "test1", poster_path: "b",  overview: "bbb", vote_average: 5.0 } as Movie;
        const movies = [movie1, movie2];
        const action = new movie.SearchAction('query');
        const completion = new movie.SearchCompleteAction(movies);
  
        actions$ = hot('-a---', { a: action });
        const response = cold('-a|', { a: movies });
        const expected = cold('--b', { b: completion });
        movieDbService.searchMovies.and.returnValue(response);
  
        expect(effects.search$).toBeObservable(expected);
      });
  
      it('should return a new movie.SearchCompleteAction, with an empty array, if the books service throws', () => {
        const action = new movie.SearchAction('query');
        const completion = new movie.SearchCompleteAction([]);
        const error = 'Error!';
  
        actions$ = hot('-a---', { a: action });
        const response = cold('-#|', {}, error);
        const expected = cold('--b', { b: completion });
        movieDbService.searchMovies.and.returnValue(response);
  
        expect(effects.search$).toBeObservable(expected);
      });
  
      it(`should not do anything if the query is an empty string`, () => {
        const action = new movie.SearchAction('');
  
        actions$ = hot('-a---', { a: action });
        const expected = cold('---');
  
        expect(effects.search$).toBeObservable(expected);
      });
  });
});