import React, { Component } from "react";
import { Media } from "react-bootstrap";
import { navigate } from "@reach/router";
import { objectToURL } from "../../lib/utils";
import axios from "axios";
import diffenrenceInHours from "date-fns/difference_in_hours";

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
    let { artist, album, title, uri, art } = this.state;
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
        user: this.props.user
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
    let { artist, title, album, uri, canAddTrack } = this.state;
    return (
      <div>
        {canAddTrack ? (
          <Media>
            <Media.Body>
              {title ? (
                <div>
                  <label>
                    Artist:{" "}
                    <input
                      type="text"
                      name="artist"
                      value={artist}
                      onChange={this.handleChange}
                      disabled
                    />
                  </label>
                  <br />
                  <label>
                    Song:{" "}
                    <input
                      type="text"
                      name="title"
                      value={title}
                      onChange={this.handleChange}
                      disabled
                    />
                  </label>
                  <br />
                  <label>
                    Album:{" "}
                    <input
                      type="text"
                      name="album"
                      value={album}
                      onChange={this.handleChange}
                      disabled
                    />
                  </label>
                  <br />
                </div>
              ) : null}
              <label>
                URI:{" "}
                <input
                  type="text"
                  name="uri"
                  value={uri}
                  onChange={this.handleChange}
                />
              </label>
              <br />
              <button onClick={this.handleShow}> Show </button>
              <br />
              {this.state.showSubmit ? (
                <button onClick={this.handleSubmit}>Submit</button>
              ) : null}
            </Media.Body>
            <Media.Left>
              <img alt={"Album Art"} src={this.state.art} />
            </Media.Left>
          </Media>
        ) : (
          "Please wait " +
          diffenrenceInHours(new Date(), this.state.prevTrackdate) +
          " hours to submit a new track."
        )}
      </div>
    );
  }
}

export default AddTrack;
