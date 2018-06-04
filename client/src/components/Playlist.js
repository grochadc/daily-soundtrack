import React, { Component } from 'react';
import Loading from './Loading';
import TrackLink from './TrackLink';
import axios from 'axios';

class Playlist extends Component {
  constructor(){
    super()
    this.state = {
      tracks: null
    }
  }
  componentDidMount(){
    let that = this;
    axios.get('http://localhost:3030/api/v1/Track',
    {
      headers: {
        'Content-type': 'application/json'
      }
    })
    .then((response) => {
      let { data } = response
      that.setState({
        tracks: data
      })
    })
    .catch((error) => console.log(error));
  }
  render(){
    return(
      <div>
      <ul>
      {this.state.tracks===null ?
        <Loading />:
        this.state.tracks.map((track, i) => <li key={i}><TrackLink id={track._id} info={track.track_info}/></li>)
      }
      </ul>
      </div>
    )
  }
}

export default Playlist;
