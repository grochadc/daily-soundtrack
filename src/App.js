import React, { Component } from 'react';
import TrackSelect from './components/TrackSelect';
import Player from './components/Player';
import ConditionHOC from './components/ConditionHOC';
import {update} from 'immutability-helper';

const PlayerWithCondition = (props) => ConditionHOC(Player, props);
const TrackSelectWithCondition = (props) => ConditionHOC(TrackSelect, props);

class App extends Component {
  constructor(){
    super();
    this.state = {
      section: 'track',
      track: null
    }
  }
  setTrack(track){
    const newState = update(this.state, {track: {$set: track} });
    this.setState(newState);
  }
  render() {
    return (
      <div className="App">

        <TrackSelectWithCondition
          condition={this.state.section === 'select'}
          setTrack={this.setTrack} />

        <PlayerWithCondition
        condition={this.state.section === 'track'}
        trackNo={1} />

      </div>
    );
  }
}

export default App;
