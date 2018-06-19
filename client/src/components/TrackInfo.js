import React from "react";
import { Media, Panel } from "react-bootstrap";

export default function TrackInfo(props) {
  let { title, artist, album, art } = props;
  return (
    <Panel>
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
            <strong>Album:</strong> {album}
          </p>
        </Media.Body>
      </Media>
    </Panel>
  );
}
