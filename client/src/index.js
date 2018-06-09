import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './redux/Reducer'
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const initialState = {
  tokens: {
    access_token: null,
    refresh_token: null,
  },
  user_info: {
    country: "MX",
    display_name: "Gonzalo Rocha",
    email: "mapaxin.sepsoso.n_n@hotmail.com",
    external_urls:{spotify: "https://open.spotify.com/user/gonzaloroc"},
    followers:{href: null, total: 33},
    href:"https://api.spotify.com/v1/users/gonzaloroc",
    id:"gonzaloroc",
    images:[],
    product:"premium",
    type:"user",
    uri:"spotify:user:gonzaloroc"
  }
}

const store = createStore(reducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
