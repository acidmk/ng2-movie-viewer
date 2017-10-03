import { createSelector } from 'reselect';
import { ActionReducer, ActionReducerMap } from '@ngrx/store';
import * as fromMovies from './movies';

export interface State {
    movies: fromMovies.State;
}
  
export const reducers: ActionReducerMap<State> = {
    movies: fromMovies.reducer
}

export const getMoviesState = (state: State) => state.movies;

export const getMovieEntities = createSelector(getMoviesState, fromMovies.getEntities);
export const getSelectedMovie = createSelector(getMoviesState, fromMovies.getSelected);
export const getQuery = createSelector(getMoviesState, fromMovies.getQuery);
