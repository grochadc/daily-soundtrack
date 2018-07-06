import React, { Component } from "react";
import Player from "./components/Player";
import { Home, FollowersTracks } from "./components/Pages";
import UserTracks from "./components/containers/UserTracks";
import AddTrack from "./components/containers/AddTrack";
import AuthSuccess from "./components/containers/AuthSucces";
import Profile from "./components/containers/Profile";
import Sidebar from "./components/containers/Sidebar";
import Logout from "./components/containers/Logout.js";
import Search from "./components/containers/Search.js";
import { NotFound } from "./components/Utils.js";
import { Router } from "@reach/router";
import { Grid, Row, Col } from "react-bootstrap";
import axios from "axios";
import { verify } from "jsonwebtoken";
import spotify from "./lib/SpotifyWrapper";
import "./index.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      tokens: null,
      user: null,
      access_token: null,
      spotifyWrapper: null
    };
  }

  componentDidMount() {
    let username_from_local_storage = localStorage.getItem("daily-soundtrack")
      ? verify(
          localStorage.getItem("daily-soundtrack"),
          process.env.REACT_APP_WEBTOKEN_SECRET
        ).userid
      : null;
    let query = {
      _id: username_from_local_storage
    };

    if (query.username !== null) {
      axios("/api/v1/User?query=" + JSON.stringify(query)).then(({ data }) => {
        if (data.length === 0) {
          //If it produces no results it means we have an invalid user from jwt
          localStorage.removeItem("daily-soundtrack");
        } else {
          this.props.setSpotifyInfo(data[0]);
          this.props.setLastTrackDate(data[0].spotify_info.id);
        }
      });
    }

    function getToken() {
      axios("/token").then(({ data }) => {
        spotify.setAccessToken(data.access_token);
        this.setState({
          spotifyWrapper: spotify
        });
        setTimeout(() => getToken(), data.trueExpiresIn); //When
      });
    }
    // eslint-disable-next-line
    getToken = getToken.bind(this);
    getToken();
  }
  render() {
    return (
      <Grid>
        <div className="container">
          <Row>
            <Col>
              <Sidebar />
            </Col>
          </Row>
        </div>
        <Row>
          <Col>
            <Router>
              <Home path="/" />
              <FollowersTracks
                path="/dashboard"
                following={this.props.userFollowing}
              />
              <Player path="/player/:id" />
              <AddTrack spotify={this.state.spotifyWrapper} path="/add" />
              <AddTrack
                spotify={this.state.spotifyWrapper}
                path="/add/:trackUri"
              />
              <Search spotify={this.state.spotifyWrapper} path="/search" />
              <AuthSuccess path="/success/:userdocument" />
              <Profile path="/profile" />
              <UserTracks path="/playlist/:user" />
              <Logout path="/logout" />
              <NotFound default />
            </Router>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default App;
