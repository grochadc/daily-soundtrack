import React, { Component } from 'react';
import Player from './components/Player';
import Playlist from './components/Playlist'
import AddTrack from './components/AddTrack';
import { Router } from '@reach/router';
import { Grid, Row, Col, Nav, NavItem } from 'react-bootstrap';
import './index.css';

function Sidebar(props){
  return (
    <Nav bsStyle="pills" stacked className='fixed'>
      <NavItem href='/'>
        Home
      </NavItem>
      <NavItem href='/add'>
        Add Track
      </NavItem>
    </Nav>
  )
};


class App extends Component {

  render() {
    return (
      <Grid>
        <Row>
          <Col xs={2}>
            <Sidebar />
          </Col>
          <Col xs={8}>
            <Router>
              <Playlist path='/' />
              <Player path='/player/:id' />
              <AddTrack path='/add' />
            </Router>
          </Col>
      </Row>
      </Grid>
    );
  }
}

export default App;
