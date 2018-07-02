import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { verify } from "jsonwebtoken";
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

const fetchUserMiddleware = store => next => action => {
  if (action.type === "FETCH_USER") {
    let query = {
      _id: verify(action.payload, process.env.REACT_APP_WEBTOKEN_SECRET).userid
    };
  }
};

const store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
