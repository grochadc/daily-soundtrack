function setUserInfo(payload) {
  return {
    type: "SET_SPOTIFY_INFO",
    payload
  };
}

function setLastTrackDate(payload) {
  return {
    type: "SET_LAST_TRACK",
    payload
  };
}

function logoutUser() {
  return {
    type: "LOGOUT_USER"
  };
}

function follow(payload) {
  return {
    type: "FOLLOW",
    payload
  };
}

function unfollow(payload) {
  return {
    type: "UNFOLLOW",
    payload
  };
}

export { setUserInfo, logoutUser, follow, unfollow, setLastTrackDate };
