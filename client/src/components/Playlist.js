import React, { Component } from "react";
import { Loading } from "./Utils";
import TrackLink from "./TrackLink";
import axios from "axios";
import { Grid, Row } from "react-bootstrap";

class Playlist extends Component {
  constructor() {
    super();
    this.state = {
      tracks: null
    };
  }
  componentDidMount() {
    let { query } = this.props;
    let newQuery = query.type + "=" + JSON.stringify(query.value);
    axios({
      url: "/api/v1/Track?" + newQuery,
      method: "get"
    })
      .then(response => {
        let tracks = response.data;
        this.setState({
          tracks
        });
      })
      .catch(err => console.error(err));
  }
  render() {
    return (
      <Grid>
        <Row>
          {this.state.tracks === null ? (
            <Loading />
          ) : (
            this.state.tracks.map((track, i) => (
              <TrackLink {...track} key={i} />
            ))
          )}
        </Row>
      </Grid>
    );
  }
}

export default Playlist;
