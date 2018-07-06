import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import getLastTrack from "./redux/middleware";
import reducer from "./redux/Reducer";
import App from "./ConnectedApp";
import registerServiceWorker from "./registerServiceWorker";

const initialState = {
  user: null,
  spotify_info: {
    id: null
  },
  loggedIn: false
};

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(getLastTrack))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
