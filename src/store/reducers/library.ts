import { IBook } from 'api/types';
import { Action } from 'types/reducer';

/* ----- Types ------- */
export interface ILibraryState {
  /*
           *************** WARNING ***************
    If adding or changing keys, a migration will need
    to be added in store/migrations as this state is persisted
           *************** WARNING ***************
  */
  books: IBook[]
}

enum LibraryReducerActions {
  SET_BOOKS = 'LIBRARY_REDUCER_SET_BOOKS',
}

/* --------- Action Creators -------- */
export const setBooks = (books: IBook[]) => ({
  type: LibraryReducerActions.SET_BOOKS,
  payload: books,
});

/* -------- Selectors ------ */
export const librarySelector = (state: any): ILibraryState => state[libraryStateKey];
export const booksSelector = (state: any): IBook[] => librarySelector(state).books;

/* ---- Reducer ---- */
export const libraryStateKey = 'library';

export const defaultLibraryState: ILibraryState = {
  books: [],
};

export const libraryReducer = (
  state: ILibraryState = defaultLibraryState,
  action: Action<LibraryReducerActions, any>,
): ILibraryState => {
  switch (action.type) {
    case LibraryReducerActions.SET_BOOKS:
      return { ...state, books: action.payload };
    default:
      return state;
  }
};
