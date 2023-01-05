import { takeLatest } from 'redux-saga/effects';
import appEpic from 'store/sagas/epics/app';
import { handleButtonPending } from './helpers';

export enum RootSagaActions {
  BUTTON_PENDING = 'ROOT_SAGA_BUTTON_PENDING',
  LOAD_APP = 'ROOT_SAGA_LOAD_APP',
}

export default function* rootSaga() {
  yield takeLatest(RootSagaActions.BUTTON_PENDING, handleButtonPending);
  yield takeLatest(RootSagaActions.LOAD_APP, appEpic);
}
