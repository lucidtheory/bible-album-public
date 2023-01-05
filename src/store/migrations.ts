import { appStateKey } from 'store/reducers/app';

const migrations = {
  0: (state: any) => ({
    ...state,
    [appStateKey]: {
      ...state[appStateKey],
      hasAskedForReview: false,
    },
  }),
};

export default migrations;
