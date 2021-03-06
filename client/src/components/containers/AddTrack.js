import { connect } from "react-redux";
import AuthSucces from "../presentational/AddTrack";
import diffenrenceInHours from "date-fns/difference_in_hours";

const mapStateToProps = state => {
  return {
    user: state.spotify_info.id,
    lastTrackDate: state.lastTrackDate,
    canAddTrack: Boolean(
      diffenrenceInHours(new Date(), state.lastTrackDate) > 24
    )
  };
};

const ConnectedAuthSucces = connect(mapStateToProps)(AuthSucces);

export default ConnectedAuthSucces;
