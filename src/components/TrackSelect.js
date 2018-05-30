import React, { Component } from 'react';

export default class TrackSelect extends Component {
  constructor(){
    super()
    this.state = {
      track: null
    }
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(){
    let { track } = this.state;
    let trackID = track.substr(track.lastIndexOf(':')+1);
    this.props.setTrack(trackID);
  }
  render(){
    return (
    <div className="trackSelect">
      <input type="text" onChange={(event) => this.setState({track: event.target.value}) } />
      <button onClick={() => this.handleClick()}>Select Track</button>
    </div>
  )
  }
}
