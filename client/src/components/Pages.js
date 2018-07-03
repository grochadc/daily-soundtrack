import React from "react";
import Playlist from "./Playlist";
import { PageHeader } from "react-bootstrap";

const FollowersTracks = props => {
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
};

const Home = props => {
  let query = {
    type: "sort",
    value: { date: -1 }
  };
  return <Playlist query={query} />;
};

export { Home, FollowersTracks };
