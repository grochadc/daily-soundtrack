import React, { Component } from 'react';
import Player from './components/Player';
import Playlist from './components/Playlist'
import AddTrack from './components/AddTrack';
import { Router } from '@reach/router';
import { Grid, Row, Col, Nav, NavItem, Navbar } from 'react-bootstrap';
import './index.css';

function Sidebar(props){
  return (
    <Navbar fixedTop>
      <Navbar.Header>
        <Navbar.Brand>
          Daily Soundtrack
        </Navbar.Brand>
      </Navbar.Header>
    <Nav bsStyle="pills">
      <NavItem href='/'>
        Home
      </NavItem>
      <NavItem href='/add'>
        Add Track
      </NavItem>
    </Nav>
  </Navbar>
  )
};


class App extends Component {

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
            </Router>
          </Col>
      </Row>
      </Grid>
    );
  }
}

export default App;
