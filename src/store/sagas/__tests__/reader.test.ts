import { takeLatest, put, select } from 'redux-saga/effects';
import { bookViewingSelector, setCurrentPage } from 'store/reducers/reader';
import {
  setBooksCompleted,
  booksCompletedSelector,
} from 'store/reducers/app';
import readerEpic, {
  ReaderEpicActions,
  handleChangePage,
} from 'store/sagas/epics/reader';
import { sampleLibrary } from 'lib/sampleData';
import sagaHelper from 'redux-saga-testing';

describe('handleChangePage', () => {
  describe('Scenario 1: This is the end of the book', () => {
    const page = 10;
    const booksCompleted = 0;
    const bookViewing = { ...sampleLibrary[0], pageCount: 10 };
    const it = sagaHelper(handleChangePage({ payload: page }));

    it('should get the bookViewing from the store', (result) => {
      expect(result).toEqual(select(bookViewingSelector));

      return bookViewing;
    });
    it('should then get the booksCompleted from the store', (result) => {
      expect(result).toEqual(select(booksCompletedSelector));

      return booksCompleted;
    });
    it('should then put the current page given in the store', (result) => {
      expect(result).toEqual(put(setCurrentPage({ page, title: bookViewing.title })));
    });
    it('should then increment books completed in the store', (result) => {
      expect(result).toEqual(put(setBooksCompleted(booksCompleted + 1)));
    });
    it('should be done', (result) => {
      expect(result).toBeUndefined();
    });
  });
  describe('Scenario 2: This is not the end of the book', () => {
    const page = 10;
    const booksCompleted = 0;
    const bookViewing = { ...sampleLibrary[0], pageCount: 30 };
    const it = sagaHelper(handleChangePage({ payload: page }));

    it('should get the bookViewing from the store', (result) => {
      expect(result).toEqual(select(bookViewingSelector));

      return bookViewing;
    });
    it('should then get the booksCompleted from the store', (result) => {
      expect(result).toEqual(select(booksCompletedSelector));

      return booksCompleted;
    });
    it('should then put the current page given in the store', (result) => {
      expect(result).toEqual(put(setCurrentPage({ page, title: bookViewing.title })));
    });
    it('should be done', (result) => {
      expect(result).toBeUndefined();
    });
  });
});

describe('readerEpic', () => {
  const it = sagaHelper(readerEpic());

  it('takes latest handleChangePage', (result) => {
    expect(result).toEqual(takeLatest(ReaderEpicActions.CHANGE_PAGE, handleChangePage));
  });
  it('should be done', (result) => {
    expect(result).toBeUndefined();
  });
});
