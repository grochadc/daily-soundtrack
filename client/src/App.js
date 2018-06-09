import React, { Component } from 'react';
import Player from './components/Player';
import Playlist from './components/Playlist'
import AddTrack from './components/AddTrack';
import AuthSuccess from './components/AuthSuccess';
import ConnectedProfile from './components/containers/ConnectedProfile';
import { Router } from '@reach/router';
import { Grid, Row, Col, Nav, NavItem, Navbar } from 'react-bootstrap';
import './index.css';

function Sidebar(props){
  console.log(props.loggedIn);
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
      { props.loggedIn ?
        <NavItem href='/add'>
          Add Track
        </NavItem> :
        <NavItem href='/login'>Login</NavItem>
      }
    </Nav>
  </Navbar>
  )
};


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
              <ConnectedProfile path='/profile' />
            </Router>
          </Col>
      </Row>
      </Grid>
    );
  }
}

export default App;
