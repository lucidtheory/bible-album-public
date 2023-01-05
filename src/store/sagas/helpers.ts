import { call, put, delay, StrictEffect } from 'redux-saga/effects';
import { IResponse } from 'api/types';
import * as NavigationRef from 'navigators/navigationRef';
import { setButtonPending } from 'store/reducers/app';

const SECOND = 1000;
export const INTERVAL_DELAY = SECOND / 2;

export function* retrySaga(request: any, ...args: any):Generator<StrictEffect, IResponse, any> {
  const NUMBER_OF_RETRIES = 3;

  for (let i = 1; i <= NUMBER_OF_RETRIES; i += 1) {
    try {
      const response = yield call(request, ...args);
      return response;
    } catch (error) {
      if (i < NUMBER_OF_RETRIES) {
        yield delay(INTERVAL_DELAY);
      } else {
        return { data: { errors: error.message } };
      }
    }
  }

  return { data: { } };
}

export const navigate = (...args:any): StrictEffect => call([NavigationRef, 'navigate'], ...args);

export function* handleButtonPending(action: any): Generator<StrictEffect, void, any> {
  const { payload } = action;

  yield put(setButtonPending(payload));
}
