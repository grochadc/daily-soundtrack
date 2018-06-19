import React from "react";
import Playlist from "./Playlist";
import { PageHeader } from "react-bootstrap";

function Home(props) {
  let query = {
    type: "sort",
    value: { date: -1 }
  };
  return <Playlist query={query} />;
}

function UserTracks(props) {
  let query = {
    type: "query",
    value: { user: props.user }
  };
  return (
    <div>
      <PageHeader>{props.user}'s Playlist</PageHeader>
      <Playlist query={query} />
    </div>
  );
}

export { Home, UserTracks };
