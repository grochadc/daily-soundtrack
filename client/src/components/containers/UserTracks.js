import UserTracks from "../presentational/UserTracks";
import { connect } from "react-redux";
import { follow, unfollow } from "../../redux/actions";

const mapStateToProps = state => {
  if (state.following) {
    return {
      loggedInUser: state.spotify_info.id,
      following: state.following,
      currentUser: {
        _id: state._id
      }
    };
  } else {
    return {
      loggedInUser: null,
      following: [],
      currentUser: {}
    };
  }
};

const mapDispatchToProps = dispatch => {
  return {
    follow: user => dispatch(follow(user)),
    unfollow: user => dispatch(unfollow(user))
  };
};

const ConnectedUserTracks = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserTracks);

export default ConnectedUserTracks;
