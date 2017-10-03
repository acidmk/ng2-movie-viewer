import { Movie } from '../models/movie';
import * as movie from '../actions/movie';

export interface State {
    entities: Movie[],
    selectedMovie: Movie,
    query: string
};

export const initialState: State = {
    entities: [],
    selectedMovie: null,
    query: ''
};

export function reducer(state = initialState, action: movie.Actions): State {
  switch (action.type) {
        case movie.SEARCH_COMPLETE:
        case movie.LOAD_COMPLETE: {
            console.log(action.payload);
            return {            
                entities: action.payload,
                selectedMovie: action.payload.length ? action.payload[0] : null,
                query: state.query
            }
        }

        case movie.GET_POPULAR: {
            return {            
                entities: state.entities,
                selectedMovie: state.selectedMovie,
                query: ''
            }
        }

        case movie.SELECT: {
            console.log(action.payload);
            return {            
                entities: state.entities,
                selectedMovie: action.payload,
                query: state.query  
            } 
        }       

        case movie.SEARCH: {
            console.log(action.payload);
            return {            
                entities: state.entities,
                selectedMovie: state.selectedMovie,
                query: action.payload  
            } 
        }

        default: {
        return state;
        }
    }   
  
}

export const getEntities = (state: State) => state.entities;
export const getSelected = (state: State) => state.selectedMovie;
export const getQuery = (state: State) => state.query;
