import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import rootSaga from './sagas';
import './index.scss';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import StoreConfig from './store/index';

const store = StoreConfig({isLoginPending: false});
store.runSaga(rootSaga);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
