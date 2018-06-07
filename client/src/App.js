import React, { Component } from 'react';
import Player from './components/Player';
import Playlist from './components/Playlist'
import AddTrack from './components/AddTrack';
import AuthSuccess from './components/AuthSuccess';
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
  constructor(){
    super()
    this.state = {
      access_token: null,
      refresh_token: null
    }
    this.handleTokens = this.handleTokens.bind(this);
  }

  handleTokens(tokens){
    let { access_token, refresh_token } = tokens;
    this.setState({
      access_token,
      refresh_token
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
              <AuthSuccess path='/success/:tokens' someprop='Iamsomeprop' sendTokens={this.handleTokens}
                />
            </Router>
          </Col>
      </Row>
      </Grid>
    );
  }
}

export default App;
