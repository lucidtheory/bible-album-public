import { takeLatest, StrictEffect } from 'redux-saga/effects';
import Routes from 'navigators/routes';
import { navigate } from 'store/sagas/helpers';

export enum ServiceEpicActions {
  VIEW_ABOUT = 'SERVICE_EPIC_VIEW_ABOUT',
}

export function* handleViewAbout():Generator<StrictEffect, void, any> {
  yield navigate(Routes.About);
}

export default function* serviceEpic(): Generator<StrictEffect, void, any> {
  yield takeLatest(ServiceEpicActions.VIEW_ABOUT, handleViewAbout);
}
