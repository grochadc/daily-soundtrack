import React, { Component } from "react";
import Player from "./components/Player";
import { Home, UserTracks } from "./components/Pages";
import AddTrack from "./components/containers/AddTrack";
import AuthSuccess from "./components/containers/AuthSucces";
import Profile from "./components/containers/Profile";
import Sidebar from "./components/containers/Sidebar";
import Logout from "./components/containers/Logout.js";
import { NotFound } from "./components/Utils.js";
import { Router } from "@reach/router";
import { Grid, Row, Col } from "react-bootstrap";
import axios from "axios";
import { verify } from "jsonwebtoken";
import "./index.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      tokens: null,
      user: null
    };
    this.handleSession = this.handleSession.bind(this);
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
        }
      });
    }
  }

  handleSession(data) {
    console.log("Hanlde session data: ", data);
    let { tokens } = data;
    let { user } = data;
    this.setState({
      tokens,
      user
    });
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
              <NotFound default />
              <Home path="/" />
              <Player path="/player/:id" />
              <AddTrack path="/add" />
              <AuthSuccess
                path="/success/:userdocument"
                sendSession={this.handleSession}
              />
              <Profile path="/profile" />
              <UserTracks path="/playlist/:user" />
              <Logout path="/logout" />
            </Router>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default App;
