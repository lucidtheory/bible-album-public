import {
  takeLatest,
  put,
  spawn,
  call,
  StrictEffect,
} from 'redux-saga/effects';
import { setBookViewing } from 'store/reducers/reader';
import { setAppLoading } from 'store/reducers/app';
import {
  setBooks,
} from 'store/reducers/library';
import Routes from 'navigators/routes';
import { getBooks, getBook } from 'api';
import { navigate, retrySaga } from 'store/sagas/helpers';

export enum LibraryEpicActions {
  GO_TO_BOOK = 'LIBRARY_EPIC_GO_TO_BOOK',
}

export function* handleGoToBook(action: any):Generator<StrictEffect, void, any> {
  // set the book given into the store and navigate to the reader
  yield put(setBookViewing(action.payload));
  yield navigate(Routes.Reader);

  // update the book in the background
  const { data } = yield call(retrySaga, getBook, action.payload.id);

  if (data.errors) {
    // TODO: Handle Errors
    return;
  }

  // set the updated book in the store
  yield put(setBookViewing(data));
}

export function* handleGetBooks():Generator<StrictEffect, void, any> {
  yield put(setAppLoading(true));
  const { data } = yield call(retrySaga, getBooks);

  if (data.errors) {
    // TODO: Handle Errors
    yield put(setAppLoading(false));
    return;
  }

  yield put(setBooks(data));
  yield put(setAppLoading(false));
}

export default function* libraryEpic(): Generator<StrictEffect, void, any> {
  yield spawn(handleGetBooks);
  yield takeLatest(LibraryEpicActions.GO_TO_BOOK, handleGoToBook);
}
