import { persistStore, persistReducer, createMigrate } from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import createSagaMiddleware from 'redux-saga';
import saga from 'store/sagas';
import debounce from 'lib/debounce';
import migrations from './migrations';
import reducer from './reducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  version: 0,
  migrate: createMigrate(migrations, { debug: false }),
};

const persistedReducer = persistReducer(persistConfig, reducer);
export const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: persistedReducer,
  middleware: [sagaMiddleware],
});
const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

if (module.hot) {
  module.hot.accept(debounce(() => {
    /* eslint-disable-next-line global-require */
    const nextRootReducer = require('store/reducers').default;
    store.replaceReducer(nextRootReducer);
  }, 1000));
}

export default () => {
  sagaMiddleware.run(saga);
  return { persistor, store };
};
