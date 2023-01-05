import appEpic, {
  AppEpicActions,
  handleSetHasAskedForReview,
} from 'store/sagas/epics/app';
import sagaHelper from 'redux-saga-testing';
import { takeLatest, put, spawn } from 'redux-saga/effects';
import { setHasAskedForReview } from 'store/reducers/app';
import libraryEpic from 'store/sagas/epics/library';
import readerEpic from 'store/sagas/epics/reader';
import serviceEpic from 'store/sagas/epics/services';

describe('handleSetHasAskedForReview', () => {
  const it = sagaHelper(handleSetHasAskedForReview());

  it('sets hasAskedForReview to true in the store', (result) => {
    expect(result).toEqual(put(setHasAskedForReview(true)));
  });
  it('shold be done', (result) => {
    expect(result).toBeUndefined();
  });
});

describe('appEpic', () => {
  const it = sagaHelper(appEpic());
  it('first spawns the library epic', (result) => {
    expect(result).toEqual(spawn(libraryEpic));
  });
  it('then spawns the reader epic', (result) => {
    expect(result).toEqual(spawn(readerEpic));
  });
  it('then spawns the services epic', (result) => {
    expect(result).toEqual(spawn(serviceEpic));
  });
  it('then takes the latest for handleSetHasAskedForReview', (result) => {
    expect(result).toEqual(takeLatest(AppEpicActions.SET_HAS_ASKED_FOR_REVIEW, handleSetHasAskedForReview));
  });
  it('should be done', (result) => {
    expect(result).toBeUndefined();
  });
});
