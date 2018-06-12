import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './redux/Reducer'
import { verify } from 'jsonwebtoken';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

let info_from_local_storage = localStorage.getItem('jwt') ? verify(localStorage.getItem('jwt'), process.env.REACT_APP_WEBTOKEN_SECRET).user_info : null;

const initialState = {
  tokens: {
    access_token: null,
    refresh_token: null,
  },
  user_info: info_from_local_storage
}

const store = createStore(reducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
