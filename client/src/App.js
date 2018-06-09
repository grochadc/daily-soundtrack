import React, { Component } from 'react';
import Player from './components/Player';
import Playlist from './components/Playlist'
import AddTrack from './components/containers/AddTrack';
import AuthSuccess from './components/containers/AuthSucces';
import Profile from './components/containers/Profile';
import Sidebar from './components/containers/Sidebar';
import { Router } from '@reach/router';
import { Grid, Row, Col } from 'react-bootstrap';
import './index.css';


class App extends Component {
  constructor(){
    super()
    this.state = {
      tokens: null,
      user: null
    }
    this.handleSession = this.handleSession.bind(this);
  }

  handleSession(data){
    console.log('Hanlde session data: ', data);
    let { tokens } = data;
    let { user } = data;
    this.setState({
      tokens,
      user
    })
  }

  render() {
    return (
      <Grid>
        <div className="container">
        <Row>
          <Col>
          <Sidebar />
          </Col>
        </Row>
      </div>
        <Row>
          <Col>
            <Router>
              <Playlist path='/' />
              <Player path='/player/:id' />
              <AddTrack path='/add' />
              <AuthSuccess path='/success/:tokens'
                sendSession={this.handleSession}
                />
              <Profile path='/profile' />
            </Router>
          </Col>
      </Row>
      </Grid>
    );
  }
}

export default App;
