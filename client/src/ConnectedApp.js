import { connect } from "react-redux";
import App from "./App.js";
import { setUserInfo, follow, setLastTrackDate } from "./redux/actions";

const mapStateToProps = state => {
  return {
    userFollowing: state.following
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setSpotifyInfo: info => {
      dispatch(setUserInfo(info));
    },
    follow: user => {
      dispatch(follow(user));
    },
    setLastTrackDate: id => {
      dispatch(setLastTrackDate(id));
    }
  };
};

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default ConnectedApp;
