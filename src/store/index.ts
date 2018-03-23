import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import { enthusiasm } from '../reducers';

const StoreConfig = (initialState: any) => {
  const sagaMiddleware = createSagaMiddleware();

  const store: any = createStore(
    enthusiasm,
    initialState,
    compose(
      applyMiddleware(sagaMiddleware),
      window['devToolsExtension'] ? window['devToolsExtension']() : (f: any) => f,
    ),
  );
  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);

  return store;
};

export default StoreConfig;