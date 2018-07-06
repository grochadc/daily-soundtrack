import React from "react";
import TrackInfo from "./TrackInfo";
import TrackMessage from "./TrackMessage";

function TrackInfoAndMessage(props) {
  return (
    <div>
      <h4>Did you mean this track?</h4>
      <TrackInfo {...props.track} />
      <TrackMessage sendMessage={props.handleMessage} />
      <button onClick={() => props.handleSubmit(props.track)}>Submit</button>
    </div>
  );
}

export default TrackInfoAndMessage;
