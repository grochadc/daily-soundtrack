import React from "react";
import Playlist from "./Playlist";
import { PageHeader } from "react-bootstrap";

function Home(props) {
  return <Playlist />;
}

function UserTracks(props) {
  return (
    <div>
      <PageHeader>{props.user}'s Playlist</PageHeader>
      <Playlist user={props.user} />
    </div>
  );
}

export { Home, UserTracks };
