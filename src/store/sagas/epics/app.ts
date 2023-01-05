import {
  takeLatest,
  put,
  spawn,
  StrictEffect,
} from 'redux-saga/effects';
import { setHasAskedForReview } from 'store/reducers/app';
import libraryEpic from 'store/sagas/epics/library';
import readerEpic from 'store/sagas/epics/reader';
import serviceEpic from 'store/sagas/epics/services';

export enum AppEpicActions {
  SET_HAS_ASKED_FOR_REVIEW = 'APP_EPIC_SET_HAS_ASKED_FOR_REVIEW',
}

export function* handleSetHasAskedForReview():Generator<StrictEffect, void, any> {
  yield put(setHasAskedForReview(true));
}

export default function* appEpic(): Generator<StrictEffect, void, any> {
  yield spawn(libraryEpic);
  yield spawn(readerEpic);
  yield spawn(serviceEpic);
  yield takeLatest(AppEpicActions.SET_HAS_ASKED_FOR_REVIEW, handleSetHasAskedForReview);
}
