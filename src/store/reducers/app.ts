import { Action } from 'types/reducer';

/* ----- Types ------- */
export interface IAppState {
  /*
           *************** WARNING ***************
    If adding or changing keys, a migration will need
    to be added in store/migrations as this state is persisted
           *************** WARNING ***************
  */
  pagesRead: number
  booksCompleted: number
  buttonPending: boolean
  hasAskedForReview: boolean
  appLoading: boolean
}

enum AppReducerActions {
  SET_PAGES_READ = 'APP_REDUCER_SET_PAGES_READ',
  SET_BOOKS_COMPLETED = 'APP_REDUCER_SET_BOOKS_COMPLETED',
  SET_BUTTON_PENDING = 'APP_REDUCER_SET_BUTTON_PENDING',
  SET_HAS_ASKED_FOR_REVIEW = 'APP_REDUCER_SET_HAS_ASKED_FOR_REVIEW',
  SET_APP_LOADING = 'APP_REDUCER_SET_APP_LOADING',
}

/* --------- Action Creators -------- */
export const setPagesRead = (pagesRead: number) => ({
  type: AppReducerActions.SET_PAGES_READ,
  payload: pagesRead,
});
export const setBooksCompleted = (booksCompleted: number) => ({
  type: AppReducerActions.SET_BOOKS_COMPLETED,
  payload: booksCompleted,
});
export const setButtonPending = (buttonPending: boolean) => ({
  type: AppReducerActions.SET_BUTTON_PENDING,
  payload: buttonPending,
});
export const setHasAskedForReview = (hasAskedForReview: boolean) => ({
  type: AppReducerActions.SET_HAS_ASKED_FOR_REVIEW,
  payload: hasAskedForReview,
});
export const setAppLoading = (appLoading: boolean) => ({
  type: AppReducerActions.SET_APP_LOADING,
  payload: appLoading,
});
/* -------- Selectors ------ */
export const appSelector = (state: any): IAppState => state[appStateKey];
export const pagesReadSelector = (state: any): number => appSelector(state).pagesRead;
export const booksCompletedSelector = (state: any): number => appSelector(state).booksCompleted;
export const buttonPendingSelector = (state: any): boolean => appSelector(state).buttonPending;
export const hasAskedForReviewSelector = (state: any): boolean => appSelector(state).hasAskedForReview;
export const appLoadingSelector = (state: any): boolean => appSelector(state).appLoading;

/* ---- Reducer ---- */
export const appStateKey = 'app';

export const defaultAppState: IAppState = {
  pagesRead: 0,
  booksCompleted: 0,
  buttonPending: false,
  hasAskedForReview: false,
  appLoading: true,
};

export const appReducer = (
  state: IAppState = defaultAppState,
  action: Action<AppReducerActions, any>,
): IAppState => {
  switch (action.type) {
    case AppReducerActions.SET_PAGES_READ:
      return { ...state, pagesRead: action.payload };
    case AppReducerActions.SET_BOOKS_COMPLETED:
      return { ...state, booksCompleted: action.payload };
    case AppReducerActions.SET_BUTTON_PENDING:
      return { ...state, buttonPending: action.payload };
    case AppReducerActions.SET_HAS_ASKED_FOR_REVIEW:
      return { ...state, hasAskedForReview: action.payload };
    case AppReducerActions.SET_APP_LOADING:
      return { ...state, appLoading: action.payload };
    default:
      return state;
  }
};
