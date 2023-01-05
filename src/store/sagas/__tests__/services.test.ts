import serviceEpic, {
  handleViewAbout,
  ServiceEpicActions,
} from 'store/sagas/epics/services';
import { takeLatest } from 'redux-saga/effects';
import Routes from 'navigators/routes';
import { navigate } from 'store/sagas/helpers';
import sagaHelper from 'redux-saga-testing';

describe('handle view about', () => {
  const it = sagaHelper(handleViewAbout());

  it('should navigate to the about screen', (result) => {
    expect(result).toEqual(navigate(Routes.About));
  });
  it('should be done', (result) => {
    expect(result).toBeUndefined();
  });
});

describe('serviceEpic', () => {
  const it = sagaHelper(serviceEpic());

  it('takes latest handleViewAbout', (result) => {
    expect(result).toEqual(takeLatest(ServiceEpicActions.VIEW_ABOUT, handleViewAbout));
  });
  it('should be done', (result) => {
    expect(result).toBeUndefined();
  });
});
