import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import { enthusiasm } from '../reducers';

const StoreConfig = (initialState: any) => {
  const sagaMiddleware = createSagaMiddleware();

  const enhancer = window['devToolsExtension']
    ? window['devToolsExtension']()(createStore)
    : createStore;
  const store = enhancer(
    enthusiasm,
    initialState,
    compose(applyMiddleware(sagaMiddleware)),
  );
  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);

  return store;
};

export default StoreConfig;