import { combineReducers } from 'redux';
import { appStateKey, appReducer } from './app';
import { libraryStateKey, libraryReducer } from './library';
import { readerStateKey, readerReducer } from './reader';

export default combineReducers({
  [appStateKey]: appReducer,
  [libraryStateKey]: libraryReducer,
  [readerStateKey]: readerReducer,
});
