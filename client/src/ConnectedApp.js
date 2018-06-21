import { connect } from "react-redux";
import App from "./App.js";
import { setUserInfo } from "./redux/actions";

const mapDispatchToProps = dispatch => {
  return {
    setSpotifyInfo: info => {
      dispatch(setUserInfo(info));
    }
  };
};

const ConnectedApp = connect(
  null,
  mapDispatchToProps
)(App);

export default ConnectedApp;
