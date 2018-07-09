import { connect } from "react-redux";
import Sidebar from "../presentational/Sidebar";

const mapStateToProps = state => {
  return {
    user_info: state.spotify_info,
    loggedIn: state.loggedIn
  };
};

const ConnectedSidebar = connect(mapStateToProps)(Sidebar);

export default ConnectedSidebar;
