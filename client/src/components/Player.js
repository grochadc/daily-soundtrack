import React, { Component } from "react";
import axios from "axios";
import { Loading } from "./Utils";
import { Grid, Row, Col, Button } from "react-bootstrap";

export default class Player extends Component {
  constructor() {
    super();
    this.state = {
      track: null,
      message: null,
      trackBefore: null,
      trackAfter: null
    };
  }
  componentDidMount() {
    let that = this;
    let query = {
      _id: this.props.id
    };
    axios
      .get("/api/v1/Track?query=" + JSON.stringify(query), {
        headers: {
          "Content-type": "application-json"
        }
      })
      .then(function(response) {
        let { uri, message } = response.data[0];

        let track = uri.substr(uri.lastIndexOf(":") + 1);
        that.setState({ track, message });
      })
      .catch(function(error) {
        console.log(error);
      });

    axios
      .get("/api/v1/Track/around/" + this.props.id)
      .then(response => {
        let docs = response.data;
        that.setState({
          trackBefore: docs[0][0],
          trackAfter: docs[1][0]
        });
      })
      .catch(err => console.log(err));
  }
  render() {
    let URL = "https://open.spotify.com/embed/track/" + this.state.track;
    return (
      <Grid>
        <Row>
          <Col sm={7} smOffset={2}>
            {this.state.trackBefore && (
              <Button>
                <a href={"/player/" + this.state.trackBefore._id}>Before</a>
              </Button>
            )}
            {this.state.trackAfter && (
              <Button className="pull-right">
                <a href={"/player/" + this.state.trackAfter._id}>After</a>
              </Button>
            )}
          </Col>
        </Row>
        <Row>
          <Col sm={5} smOffset={3}>
            {this.state.track === null ? (
              <Loading />
            ) : (
              <div>
                <iframe
                  src={URL}
                  width="300"
                  height="80"
                  frameBorder="0"
                  allowtransparency="true"
                  allow="encrypted-media"
                  title="currentTrack"
                />
                <p>{this.state.message}</p>
              </div>
            )}
          </Col>
        </Row>
      </Grid>
    );
  }
}
