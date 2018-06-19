import React, { Component } from "react";
import { Media } from "react-bootstrap";
import { navigate } from "@reach/router";
import { objectToURL } from "../../lib/utils";
import TrackInfo from "../TrackInfo";
import TrackMessage from "../TrackMessage";
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
      query: { user: "gonzaloroc" },
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
    console.log("Submit art ", art);

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
        console.log(response);
        if (response.status === 201) {
          alert("Song submitted");
          navigate("/");
        }
      })
      .catch(err => console.log(err));
  }

  handleShow() {
    let that = this;
    let uri = this.state.uri;
    async function getToken() {
      let response = await axios.get("/token");
      let token = response.data.access_token;
      let trackAPI = await axios({
        method: "GET",
        url:
          "https://api.spotify.com/v1/tracks/" +
          uri.substr(uri.lastIndexOf(":") + 1), //Strip the id from URI by finding the last :
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        }
      });
      let track = trackAPI.data;
      let art = track.album.images[1].url;
      let artist = track.artists[0].name;
      let title = track.name;
      let album = track.album.name;

      that.setState({
        art,
        artist,
        title,
        album,
        showSubmit: true
      });
    }
    getToken();
  }

  render() {
    //Pick all the state items i'll use and rest the mediaInfo to use into track component
    let { uri, message, canAddTrack, showSubmit, ...mediaInfo } = this.state;
    return (
      <div>
        {canAddTrack ? (
          <Media>
            <Media.Body>
              <label>
                URI:{" "}
                <input
                  type="text"
                  name="uri"
                  value={uri}
                  onChange={this.handleChange}
                />
              </label>
              <button onClick={this.handleShow}> Show </button>
              <br />
            </Media.Body>
          </Media>
        ) : (
          "Please wait " +
          diffenrenceInHours(new Date(), this.state.prevTrackdate) +
          " hours to submit a new track."
        )}
        {showSubmit ? (
          <div>
            <h4>Did you mean this track?</h4>
            <TrackInfo {...mediaInfo} />
            <TrackMessage
              value={message}
              name="message"
              onChange={this.handleChange}
            />
            <button onClick={this.handleSubmit}>Submit</button>
          </div>
        ) : null}
      </div>
    );
  }
}

export default AddTrack;
