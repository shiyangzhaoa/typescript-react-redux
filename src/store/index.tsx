import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { enthusiasm } from '../reducers';

const StoreConfig = () => {
  const enhancer = window['devToolsExtension']
    ? window['devToolsExtension']()(createStore)
    : createStore;
  const store = enhancer(
    enthusiasm, { enthusiasmLevel: 1, languageName: 'TypeScript' },
    compose(applyMiddleware(thunk)),
  );
  return store;
};

export default StoreConfig;