import React, { Component } from 'react';
import Player from './components/Player';
import Playlist from './components/Playlist'
import { Router } from '@reach/router';

class App extends Component {
  constructor(){
    super()
    this.state = {
      trackID: '5b1081978d95a67d22cee5fe'
    }
    this.setTrackID = this.setTrackID.bind(this);
  }

  setTrackID(id){
    this.setState({
      trackID: id
    })
  }

  render() {
    return (
      <div className="App">
      <Router>
        <Playlist path='/' />
        <Player path='/player/:id' />
      </Router>
      </div>
    );
  }
}

export default App;
