import axios from "axios";
const getLastTrack = store => next => action => {
  if (action.type === "SET_LAST_TRACK") {
    console.log("Query ", action.payload);
    axios(
      `/api/v1/Track?query=${JSON.stringify(
        action.payload
      )}&sort={"date":-1}&limit=1`
    ).then(({ data }) => {
      if (data.length) {
        store.dispatch({ type: "SET_LAST_TRACK_FINAL", payload: data[0].date });
      }
    });
  }
  return next(action);
};

export default getLastTrack;
