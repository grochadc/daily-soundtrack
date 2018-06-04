import React, { Component } from 'react';
import TrackSelect from './components/TrackSelect';
import Player from './components/Player';
import { Switch, Route, Link, Router } from 'react-router-dom';

const Playlist = () => <div>I am a playlist <Link to="/playlist/0">I am a link</Link></div>


const Main = (props) => (
  <main>
  <Router>
    <Switch>
      <Route exact path='/' render={() => <TrackSelect setTrack={props.setTrack} />} />
      <Route path='/playlist/:track' component={Player} />
      <Route exact path='/playlist' component={Playlist} />
    </Switch>
    </Router>
  </main>
)

class App extends Component {
  render() {
    return (
      <div className="App">
        <Main />
      </div>
    );
  }
}

export default App;
