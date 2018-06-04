import React, { Component } from 'react';
import Player from './components/Player';
import Playlist from './components/Playlist'
import { Router } from '@reach/router';

class App extends Component {

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
