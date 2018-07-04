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
    if (nextProps.spotify) {
      nextProps.spotify
        .searchTracks("This is america", { limit: 5 })
        .then(({ tracks }) => this.setState({ tracks: tracks.items }))
        .catch(err => console.log(err));
    }
  }
  render() {
    return (
      <div>
        {this.state.tracks !== null &&
          this.state.tracks.map(track => <TrackInfo {...track} />)}
      </div>
    );
  }
}

export default Search;
