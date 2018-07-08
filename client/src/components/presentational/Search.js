import React, { Component } from "react";
import TrackInfo from "../TrackInfo";
import TrackMessage from "../TrackMessage";
import WaitMessage from "../WaitMessage";
import { Loading, SimpleForm } from "../Utils";
import axios from "axios";
import { navigate } from "@reach/router";

class Search extends Component {
  constructor() {
    super();
    this.state = {
      tracks: null,
      searchTerm: "",
      selectedTrack: null,
      searching: false,
      message: ""
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleUri = this.handleUri.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
  }
  handleSearch(searchTerm) {
    this.setState({ searching: true });
    if (this.state.tracks !== null) {
      this.setState({ tracks: null });
    }
    if (this.props.spotify.searchTracks) {
      if (searchTerm) {
        this.props.spotify
          .searchTracks(searchTerm, { limit: 5 })
          .then(({ tracks }) =>
            this.setState({ tracks: tracks.items, searching: false })
          )
          .catch(err => console.log(err));
      } else {
        alert("Please introduce a search term");
        this.setState({ searching: false });
      }
    } else {
      console.error(new Error("Props object does not contain spotify wrapper"));
    }
  }
  handleUri(track) {
    this.setState({ selectedTrack: track });
  }
  handleMessage(value) {
    this.setState({ message: value });
  }
  handleSubmit() {
    let { name, artists, album, uri } = this.state.selectedTrack;
    let title = name;
    let artist = artists[0].name;
    let art = album.images[1].url;
    let { message } = this.state;
    axios
      .post("api/v1/Track", {
        track_info: {
          art,
          artist,
          album: album.name,
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
  render() {
    return (
      <div>
        {this.props.canAddTrack || true ? (
          <SimpleForm button="Search" onSubmit={this.handleSearch} />
        ) : (
          <WaitMessage date={this.props.lastTrackDate} />
        )}
        {this.state.searching && <Loading />}
        {this.state.tracks !== null &&
          this.state.tracks
            .filter(track => {
              if (this.state.selectedTrack) {
                return track.uri === this.state.selectedTrack.uri;
              } else {
                return true;
              }
            })
            .map(track => (
              <TrackInfo
                track={track}
                sendUri={this.handleUri}
                key={track.uri}
              />
            ))}
        {this.state.selectedTrack && (
          <div>
            <TrackMessage sendMessage={this.handleMessage} />
            <p>
              <button onClick={this.handleSubmit}>Submit</button>
            </p>
          </div>
        )}
      </div>
    );
  }
}

export default Search;
