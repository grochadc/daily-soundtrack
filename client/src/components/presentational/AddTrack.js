import React, { Component } from "react";
import { Media } from "react-bootstrap";
import { navigate } from "@reach/router";
import { objectToURL } from "../../lib/utils";
import TrackInfoAndMessage from "../TrackInfoAndMessage";
import axios from "axios";
import diffenrenceInHours from "date-fns/difference_in_hours";
import "../../index.css";

class AddTrack extends Component {
  constructor() {
    super();
    this.state = {
      artist: "",
      title: "",
      album: "",
      uri: "",
      art: "",
      user: "",
      message: "",
      foundTrack: null,
      showSubmit: false,
      canAddTrack: true,
      prevTrackdate: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleShow = this.handleShow.bind(this);
  }

  componentDidMount() {
    let query = objectToURL({
      query: { user: this.props.user },
      sort: { date: -1 },
      limit: 1,
      select: "date"
    });
    let that = this;
    axios("/api/v1/Track?" + query)
      .then(res => {
        that.setState({
          canAddTrack: Boolean(
            diffenrenceInHours(new Date(), res.data[0].date) > 24
          ),
          prevTrackdate: res.data[0].date
        });
        console.log("prevTrackdate: ", res.data[0].date);
      })
      .catch(err => console.error(err));
  }

  handleChange(event) {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    let { artist, album, title, uri, art, message } = this.state;

    axios
      .post("api/v1/Track", {
        track_info: {
          art,
          artist,
          album,
          title
        },
        uri,
        date: new Date(),
        user: this.props.user,
        message
      })
      .then(response => {
        if (response.status === 201) {
          alert("Song submitted");
          navigate("/");
        }
      })
      .catch(err => console.log(err));
  }

  handleShow() {
    console.log(this.props.trackUri);
    let { spotify } = this.props;
    let that = this;
    let uri = this.state.uri;

    spotify.getTrack(uri).then(track => {
      let art = track.album.images[1].url;
      let artist = track.artists[0].name;
      let title = track.name;
      let album = track.album.name;

      that.setState({
        foundTrack: track,
        art,
        artist,
        title,
        album,
        showSubmit: true
      });
    });
  }

  render() {
    //Pick all the state items i'll use and rest the mediaInfo to use into track component
    let { message, showSubmit } = this.state;
    return (
      <div>
        {this.props.canAddTrack ? (
          <URIForm
            handleChange={this.handleChange}
            handleShow={this.handleShow}
          />
        ) : (
          "Please wait " +
          (24 -
            diffenrenceInHours(
              new Date(),
              new Date(this.state.prevTrackdate)
            )) +
          " hours to submit a new track."
        )}
        {showSubmit && (
          <TrackInfoAndMessage
            track={this.state.foundTrack}
            message={message}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
        )}
      </div>
    );
  }
}

function URIForm(props) {
  return (
    <Media>
      <Media.Body>
        <label>
          URI:{" "}
          <input
            type="text"
            name="uri"
            value={props.uri}
            onChange={props.handleChange}
          />
        </label>
        <button onClick={props.handleShow}> Show </button>
        <br />
      </Media.Body>
    </Media>
  );
}

export default AddTrack;
