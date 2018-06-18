import React from "react";
import { Media, Panel } from "react-bootstrap";

export default function TrackInfo(props) {
  let { title, artist, album, art } = props;
  return (
    <Panel>
      <Media>
        <img alt={"Album Art"} src={art} height="200" width="200" />
        <Media.Body>
          <p>
            <h4>Title:</h4> {title}
          </p>
          <p>
            <h4>Artist:</h4> {artist}
          </p>
          <p>
            <h4>Album:</h4> {album}
          </p>
        </Media.Body>
      </Media>
    </Panel>
  );
}
