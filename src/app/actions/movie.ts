import { Action } from '@ngrx/store';
import { Movie } from '../models/movie';

export const GET_POPULAR =     '[Movie] Get popular';
export const LOAD_COMPLETE =   '[Movie] Load complete';
export const SELECT =          '[Movie] Select';
export const SEARCH =          '[Movie] Search';
export const SEARCH_COMPLETE = '[Movie] Search complete';

export class GetPopularAction implements Action {
  readonly type = GET_POPULAR;

  constructor() { }
}

export class LoadCompleteAction implements Action {
  readonly type = LOAD_COMPLETE;

  constructor(public payload: Movie[]) { }
}

export class SearchAction implements Action {
  readonly type = SEARCH;

  constructor(public payload: string) { }
}

export class SearchCompleteAction implements Action {
  readonly type = SEARCH_COMPLETE;

  constructor(public payload: Movie[]) { }
}

export class SelectAction implements Action {
  readonly type = SELECT;

  constructor(public payload: Movie) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
  = GetPopularAction
  | LoadCompleteAction
  | SearchAction
  | SearchCompleteAction
  | SelectAction;
