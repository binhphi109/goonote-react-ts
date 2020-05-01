import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { persistStore } from 'redux-persist';
import { createLogger } from 'redux-logger';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// creates the store
export default (rootReducer, rootSaga) => {
  const middlewares = [];
  const enhancers = [];

  middlewares.push(thunk);

  const sagaMiddleware = createSagaMiddleware();
  middlewares.push(sagaMiddleware);

  if (process.env.NODE_ENV === 'development') {
    const logger = createLogger({
      // auto collapse the actions
      collapsed: (getState, action) => true,
      // exclude the following actions from the log
      predicate: (getState, action) =>
        action.type !== 'persist/REHYDRATE' &&
        action.type !== 'persist/PERSIST',
    });
    middlewares.push(logger);
  }

  enhancers.push(applyMiddleware(...middlewares));
  
  const store = createStore(rootReducer, composeEnhancers(...enhancers));

  const persistor = persistStore(store);

  const sagasManager = sagaMiddleware.run(rootSaga);

  return {
    store,
    persistor,
    sagasManager,
    sagaMiddleware,
  };
};
