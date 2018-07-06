import React from "react";
import diffenrenceInHours from "date-fns/difference_in_hours";

function WaitMessage(props) {
  return (
    <div>
      Please wait {24 - diffenrenceInHours(new Date(), new Date(props.date))}{" "}
      hours to submit a new track.
    </div>
  );
}

export default WaitMessage;
