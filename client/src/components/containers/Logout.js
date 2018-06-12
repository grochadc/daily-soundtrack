import { connect } from 'react-redux';
import { logoutUser } from '../../redux/actions'
import Logout from '../presentational/Logout';

const mapDispatchToProps = dispatch => {
  return {
    logout: dispatch(logoutUser())
  }
}

const ConnectedLogout = connect(null, mapDispatchToProps)(Logout);

export default ConnectedLogout;
