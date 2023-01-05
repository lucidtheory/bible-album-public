import { takeLatest, put, select, StrictEffect } from 'redux-saga/effects';
import { bookViewingSelector, setCurrentPage } from 'store/reducers/reader';
import {
  setBooksCompleted,
  booksCompletedSelector,
} from 'store/reducers/app';

export enum ReaderEpicActions {
  CHANGE_PAGE = 'READER_EPIC_CHANGE_PAGE',
}

export function* handleChangePage(action: any): Generator<StrictEffect, void, any> {
  const bookViewing: ReturnType<typeof bookViewingSelector> = yield select(bookViewingSelector);
  const booksCompleted: ReturnType<typeof booksCompletedSelector> = yield select(booksCompletedSelector);

  yield put(setCurrentPage({ page: action.payload, title: bookViewing.title }));

  if (bookViewing.pageCount === action.payload) {
    yield put(setBooksCompleted(booksCompleted + 1));
  }
}

export default function* readerEpic(): Generator<StrictEffect, void, any> {
  yield takeLatest(ReaderEpicActions.CHANGE_PAGE, handleChangePage);
}
