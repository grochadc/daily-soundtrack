import React from "react";
import Playlist from "./Playlist";

function Home(props) {
  return <Playlist />;
}

function UserTracks(props) {
  return <Playlist user={props.user} />;
}

export { Home, UserTracks };
