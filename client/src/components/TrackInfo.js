import React from "react";
import { Media, Panel } from "react-bootstrap";

export default function TrackInfo(props) {
  let { name, artists, album } = props.track;
  let title = name;
  let artist = artists[0].name;
  let art = album.images[1].url;
  let { sendUri, ...completeTrack } = props;

  return (
    <Panel onClick={() => sendUri(completeTrack)} style={{ cursor: "pointer" }}>
      <Media>
        <Media.Left>
          <img alt={"Album Art"} src={art} height="100" width="100" />
        </Media.Left>
        <Media.Body>
          <p>
            <strong>Title:</strong> {title}
          </p>
          <p>
            <strong>Artist:</strong> {artist}
          </p>
          <p>
            <strong>Album:</strong> {album.name}
          </p>
        </Media.Body>
      </Media>
    </Panel>
  );
}
