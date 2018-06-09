import { connect } from 'react-redux';
import AuthSucces from '../presentational/AddTrack';

const mapStateToProps = state => {
  return {
    user: state.user_info.id,
  }
}

const ConnectedAuthSucces = connect(mapStateToProps)(AuthSucces);

export default ConnectedAuthSucces;
