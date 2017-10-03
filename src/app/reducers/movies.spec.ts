import { reducer } from './movies';
import * as fromMovies from './movies';
import * as movie from '../actions/movie';
import { Movie } from '../models/movie';

describe('MoviesReducer', () => {
    function generateMockMovie(idValue: string): Movie {
        return {
          id: idValue,
          vote_average: 5.0,
          poster_path: 'path',
          original_title: 'title',
          overview: 'text'
        };
    }

    const movie1 = generateMockMovie('1');
    const movie2 = generateMockMovie('2');

    const initialState: fromMovies.State = {
        entities: [],
        selectedMovie: null,
        query: ''
    };

    describe('undefined action', () => {
        it('should return the default state', () => {
            const result = reducer(undefined, {} as any);

            expect(result).toEqual(fromMovies.initialState);
        });
    });

    describe('SEARCH_COMPLETE & LOAD_COMPLETE', () => {

        it('should add all movies in the payload with first movie selected', () => {
            const createAction = new movie.LoadCompleteAction([movie1, movie2]);

            const expectedResult = {
                entities: [movie1, movie2],
                selectedMovie: movie1,
                query: ''
            };

            const result = reducer(initialState, createAction);
            expect(result).toEqual(expectedResult);
        });

    });

    describe('SELECT', () => {
        it('should set the selected movie on the state', () => {
            const action = new movie.SelectAction(movie1);

            const result = reducer(initialState, action);

            expect(result.selectedMovie).toBe(movie1);
        });
    });

    describe('GET_POPULAR', () => {
        it('should set the empty value for query on the state', () => {
            const action = new movie.GetPopularAction();

            const result = reducer(initialState, action);

            expect(result.query).toBe('');
        });
    });

    describe('SEARCH', () => {
        it('should set the query value on the state', () => {
            const action = new movie.SearchAction('query');

            const result = reducer(initialState, action);

            expect(result.query).toBe('query');
        });
    });
});