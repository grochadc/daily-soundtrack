function setUserInfo(payload){
  return {
    type: 'SET_USER_INFO',
    payload
  }
}

function logoutUser(){
  return {
    type: 'LOGOUT_USER'
  }
}


export { setUserInfo, logoutUser };
