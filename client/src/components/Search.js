import React, { Component } from "react";
import TrackInfo from "./TrackInfo";

class Search extends Component {
  constructor() {
    super();
    this.state = {
      tracks: null
    };
  }
  componentWillReceiveProps(nextProps) {
    nextProps.spotify
      .searchTracks("This is america", { limit: 5 })
      .then(({ tracks }) => this.setState({ tracks: tracks.items }))
      .catch(err => console.log(err));
  }
  render() {
    return (
      <div>
        {this.state.tracks !== null &&
          this.state.tracks.map(track => (
            <TrackInfo
              title={track.name}
              album={track.album.name}
              artist={track.artists[0].name}
            />
          ))}
      </div>
    );
  }
}

export default Search;
