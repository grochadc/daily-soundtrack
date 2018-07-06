const initialState = {
  lastTrack: null,
  user: null,
  spotify_info: {
    id: null
  },
  following: []
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "LOGOUT_USER":
      return {
        user: null
      };
    case "SET_LAST_TRACK_FINAL":
      return {
        lastTrackDate: action.payload,
        ...state
      };
    case "SET_SPOTIFY_INFO":
      return {
        ...state,
        ...action.payload
      };
    case "FOLLOW":
      return {
        ...state,
        following: [...state.following, action.payload]
      };
    case "UNFOLLOW":
      return {
        ...state,
        following: state.following.filter(el => !(el === action.payload)) //Immutably remove item
      };
    default:
      return state;
  }
}

export default reducer;
