import { connect } from "react-redux";
import Search from "../presentational/Search";
import diffenrenceInHours from "date-fns/difference_in_hours";

const mapStateToProps = state => {
  return {
    user: { id: state.spotify_info.id, name: state.spotify_info.display_name },
    lastTrackDate: state.lastTrackDate,
    canAddTrack: Boolean(
      diffenrenceInHours(new Date(), state.lastTrackDate) > 24
    )
  };
};

const ConnectedSearch = connect(mapStateToProps)(Search);

export default ConnectedSearch;
