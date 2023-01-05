import { IBook } from 'api/types';
import { Action } from 'types/reducer';
import { defaultCurrentPages } from 'lib/sampleData';

/* ----- Types ------- */
export interface IReaderState {
  /*
           *************** WARNING ***************
    If adding or changing keys, a migration will need
    to be added in store/migrations as this state is persisted
           *************** WARNING ***************
  */
  bookViewing: IBook
  currentPage: {
    [book: string]: number
  },
}

enum ReaderReducerActions {
  SET_BOOK_VIEWING = 'READER_REDUCER_SET_BOOK_VIEWING',
  SET_CURRENT_PAGE = 'READER_REDUCER_SET_CURRENT_PAGE',
}

/* --------- Action Creators -------- */
export const setBookViewing = (book: IBook) => ({
  type: ReaderReducerActions.SET_BOOK_VIEWING,
  payload: book,
});
export const setCurrentPage = ({ page, title }: { page: number, title: string }) => ({
  type: ReaderReducerActions.SET_CURRENT_PAGE,
  payload: { page, title },
});

/* -------- Selectors ------ */
export const readerSelector = (state: any): IReaderState => state[readerStateKey];
export const bookViewingSelector = (state: any): IBook => readerSelector(state).bookViewing;
export const currentPageSelector = (state: any): { [book: string]: number } => readerSelector(state).currentPage;

/* ---- Reducer ---- */
export const readerStateKey = 'reader';

export const defaultReaderState: IReaderState = {
  bookViewing: {
    id: '',
    coverImageUrl: '',
    bookUrl: '',
    pageCount: 0,
    title: '',
  },
  currentPage: defaultCurrentPages,
};

export const readerReducer = (
  state: IReaderState = defaultReaderState,
  action: Action<ReaderReducerActions, any>,
): IReaderState => {
  switch (action.type) {
    case ReaderReducerActions.SET_BOOK_VIEWING:
      return { ...state, bookViewing: action.payload };
    case ReaderReducerActions.SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: {
          ...state.currentPage,
          [action.payload.title]: action.payload.page,
        },
      };
    default:
      return state;
  }
};
