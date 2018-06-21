const initialState = {
  user: null
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "LOGOUT_USER":
      return {
        user: null
      };
    case "SET_SPOTIFY_INFO":
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}

export default reducer;
