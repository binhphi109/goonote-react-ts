/* eslint-disable global-require */
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import configureStore from './configureStore';
import rootSaga from '../sagas';

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  auth: require('./UserRedux').reducer,
  ...require('./NoteRedux').reducer,
});

export default () => {
  let rootReducer = reducers;

  rootReducer = persistReducer(
    { key: 'goonote-react', storage, whitelist: ['auth'] },
    reducers
  );

  const { store } = configureStore(rootReducer, rootSaga);

  if (module.hot) {
    module.hot.accept();
  }

  return store;
};
