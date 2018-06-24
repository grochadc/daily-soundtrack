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

function FollowersTracks(props) {
  let query = {
    type: "query",
    value: { user: { $in: props.following } }
  };
  return (
    <div>
      <PageHeader> Your followers tracks</PageHeader>
      <Playlist query={query} />
    </div>
  );
}

export { Home, FollowersTracks };
