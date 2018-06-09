import { connect } from 'react-redux';
import AuthSucces from '../AuthSuccess';
import setUserInfo from '../../redux/actions';

const mapStateToProps = state => {
  return {
    user_info: state.user_info,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleData: info => {
      dispatch(setUserInfo(info));
    }
  }
}

console.log(mapStateToProps);

const ConnectedAuthSucces = connect(null, mapDispatchToProps)(AuthSucces);

export default ConnectedAuthSucces;
