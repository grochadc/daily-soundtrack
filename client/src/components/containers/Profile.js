import { connect } from 'react-redux';
import Profile from '../presentational/Profile';

const mapStateToProps = state => {
  return {
    user_info: state.user_info,
  }
}

console.log(mapStateToProps);

const ConnectedProfile = connect(mapStateToProps)(Profile);

export default ConnectedProfile;
