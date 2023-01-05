import {
  retrySaga,
  handleButtonPending,
  INTERVAL_DELAY,
} from 'store/sagas/helpers';
import { call, put, delay } from 'redux-saga/effects';
import { setButtonPending } from 'store/reducers/app';
import sagaHelper from 'redux-saga-testing';

describe('retrySaga', () => {
  const mockApiCall = () => ({});

  describe('scenario 1: it succeeds on first attempt', () => {
    const it = sagaHelper(retrySaga(mockApiCall));

    it('should first call the api', (result) => {
      expect(result).toEqual(call(mockApiCall));

      // we expect our mock api call to return an empty object
      return ({});
    });

    it('and then return the api response', (result) => {
      expect(result).toEqual({});
    });
  });

  describe('scenario 2: it fails once and then succeeds', () => {
    const it = sagaHelper(retrySaga(mockApiCall));

    it('should first call the api', (result) => {
      expect(result).toEqual(call(mockApiCall));

      // spoof an api error
      return new Error('api call failed');
    });

    it('should delay for a period of time before trying again', (result) => {
      expect(result).toEqual(delay(INTERVAL_DELAY));
    });

    it('should call the api again', (result) => {
      expect(result).toEqual(call(mockApiCall));

      // this time we return the correct response
      return ({});
    });

    it('should return the api response', (result) => {
      expect(result).toEqual({});
    });
  });

  describe('scenario 3: it errors every time and returns an error', () => {
    const it = sagaHelper(retrySaga(mockApiCall));

    // First attempt
    it('should first call the api', (result) => {
      expect(result).toEqual(call(mockApiCall));

      // spoof an api error
      return new Error('api call failed');
    });

    it('should delay for a period of time before trying again', (result) => {
      expect(result).toEqual(delay(INTERVAL_DELAY));
    });

    // Second attempt
    it('should call the api again', (result) => {
      expect(result).toEqual(call(mockApiCall));

      // spoof an api error
      return new Error('api call failed');
    });

    it('should delay for a period of time before trying again', (result) => {
      expect(result).toEqual(delay(INTERVAL_DELAY));
    });

    // Third attempt
    it('should call the api again', (result) => {
      expect(result).toEqual(call(mockApiCall));

      // spoof an api error
      return new Error('api call failed');
    });

    it('should return the error that we are getting', (result) => {
      expect(result).toEqual({ data: { errors: 'api call failed' } });
    });
  });
});

describe('handleButtonPending', () => {
  const it = sagaHelper(handleButtonPending({ payload: true }));

  it('should set button pending to what was received in the payload', (result) => {
    expect(result).toEqual(put(setButtonPending(true)));
  });
});
