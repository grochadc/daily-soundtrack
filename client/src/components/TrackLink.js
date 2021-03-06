import React from "react";
import { Link } from "@reach/router";
import { Panel, Media, Well } from "react-bootstrap";
import { distanceInWordsToNow } from "date-fns";
import "../index.css";

function TrackLink(props) {
  let { track_info, message } = props;

  return (
    <Panel>
      <Panel.Body>
        <Link to={"/player/" + props._id} style={{ textDecoration: "none" }}>
          <Media>
            <Media.Left>
              <img alt={""} src={track_info.art} width="100" height="100" />
            </Media.Left>
            <Media.Body>
              <h3>{track_info.title}</h3>
              by {track_info.artist}
            </Media.Body>
            <Well style={{ marginTop: 10 }}>{message}</Well>
          </Media>
        </Link>
      </Panel.Body>
      <Panel.Footer>
        Posted by: <Link to={"/playlist/" + props.user}>{props.user.name}</Link>{" "}
        <div className="small">
          {distanceInWordsToNow(new Date(props.date))} ago
        </div>
      </Panel.Footer>
    </Panel>
  );
}

export default TrackLink;
