import { connect } from 'react-redux';
import AuthSucces from '../presentational/AuthSuccess';
import { setUserInfo } from '../../redux/actions';

const mapDispatchToProps = dispatch => {
  return {
    handleData: info => {
      dispatch(setUserInfo(info));
    }
  }
}

const ConnectedAuthSucces = connect(null, mapDispatchToProps)(AuthSucces);

export default ConnectedAuthSucces;
