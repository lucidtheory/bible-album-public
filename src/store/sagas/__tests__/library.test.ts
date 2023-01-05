import sagaHelper from 'redux-saga-testing';
import { IBook } from 'api/types';
import {
  takeLatest,
  put,
  spawn,
  call,
} from 'redux-saga/effects';
import { setBookViewing } from 'store/reducers/reader';
import { setAppLoading } from 'store/reducers/app';
import {
  setBooks,
} from 'store/reducers/library';
import Routes from 'navigators/routes';
import { getBooks, getBook } from 'api';
import { navigate, retrySaga } from 'store/sagas/helpers';
import libraryEpic, {
  LibraryEpicActions,
  handleGoToBook,
  handleGetBooks,
} from 'store/sagas/epics/library';
import { sampleLibrary } from 'lib/sampleData';

describe('handleGoToBook', () => {
  describe('Scenario 1: successfuly gets the book from the api', () => {
    const book = sampleLibrary[0];
    const retrieved = { ...book, coverImageUrl: 'hello', bookUrl: 'hello' };
    const it = sagaHelper(handleGoToBook({ payload: book }));

    it('first sets the given book in the store', (result) => {
      expect(result).toEqual(put(setBookViewing(book)));
    });
    it('then navigates to the reader screen', (result) => {
      expect(result).toEqual(navigate(Routes.Reader));
    });
    it('then calls the api with the given books id', (result) => {
      expect(result).toEqual(call(retrySaga, getBook, book.id));

      return { data: retrieved };
    });
    it('then sets retrieved book in the store', (result) => {
      expect(result).toEqual(put(setBookViewing(retrieved)));
    });
    it('should be done', (result) => {
      expect(result).toBeUndefined();
    });
  });
  describe('Scenario 2: fails to get the book from the api', () => {
    const book = sampleLibrary[0];
    const errors = 'Network Error';
    const it = sagaHelper(handleGoToBook({ payload: book }));

    it('first sets the given book in the store', (result) => {
      expect(result).toEqual(put(setBookViewing(book)));
    });
    it('then navigates to the reader screen', (result) => {
      expect(result).toEqual(navigate(Routes.Reader));
    });
    it('then calls the api with the given books id', (result) => {
      expect(result).toEqual(call(retrySaga, getBook, book.id));

      return { data: { errors } };
    });
    it('should be done', (result) => {
      expect(result).toBeUndefined();
    });
  });
});

describe('handleGetBooks', () => {
  describe('Scenario 1: books load successfuly', () => {
    const it = sagaHelper(handleGetBooks());
    const data: IBook[] = [];

    it('should set appLoading to true', (result) => {
      expect(result).toEqual(put(setAppLoading(true)));
    });
    it('then calls the api for the books', (result) => {
      expect(result).toEqual(call(retrySaga, getBooks));

      return { data };
    });
    it('then sets the retrieved data in the store', (result) => {
      expect(result).toEqual(put(setBooks(data)));
    });
    it('should then set appLoading to false', (result) => {
      expect(result).toEqual(put(setAppLoading(false)));
    });
    it('should be done', (result) => {
      expect(result).toBeUndefined();
    });
  });
  describe('Scenario 2: books fail to load', () => {
    const it = sagaHelper(handleGetBooks());
    const data = { errors: 'Something went wrong' };

    it('should set appLoading to true', (result) => {
      expect(result).toEqual(put(setAppLoading(true)));
    });
    it('then calls the api for the books', (result) => {
      expect(result).toEqual(call(retrySaga, getBooks));

      return { data };
    });
    it('should then set appLoading to false', (result) => {
      expect(result).toEqual(put(setAppLoading(false)));
    });
    it('should be done', (result) => {
      expect(result).toBeUndefined();
    });
  });
});

describe('libraryEpic', () => {
  const it = sagaHelper(libraryEpic());

  it('first loads the books from the api', (result) => {
    expect(result).toEqual(spawn(handleGetBooks));
  });
  it('then takes latest of handleGoToBook', (result) => {
    expect(result).toEqual(takeLatest(LibraryEpicActions.GO_TO_BOOK, handleGoToBook));
  });
  it('should be done', (result) => {
    expect(result).toBeUndefined();
  });
});
