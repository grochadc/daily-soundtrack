const initialState = {
  tokens: {
    access_token: null,
    refresh_token: null,
  },
  user_info: {
    display_name: 'Gonzalo Rocha de la Cruz'
  }
}

function reducer(state = initialState, action){
  switch(action.type){
    case 'SET_USER_INFO':
      return {
        ...state,
        user_info: action.payload
      }
    case 'SET_TOKENS':
      return {
        ...state,
        tokens: action.payload
      }
    case 'SET_ACCESS_TOKEN':
      return {
        ...state,
        tokens:{
          ...state.tokens,
          access_token: action.payload
        }
      }
    case 'SET_REFRESH_TOKEN':
      return {
        ...state,
        tokens: {
          ...state.tokens,
          refresh_token: action.payload
        }
      }
    default:
        return state
  }
}

export default reducer;
