function setUserInfo(payload) {
  return {
    type: "SET_SPOTIFY_INFO",
    payload
  };
}

function logoutUser() {
  return {
    type: "LOGOUT_USER"
  };
}

export { setUserInfo, logoutUser };
