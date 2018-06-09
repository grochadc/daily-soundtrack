import React from 'react';
import { Link } from '@reach/router';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

function Sidebar(props){
  return (
    <Navbar fixedTop>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to='/'>Daily Soundtrack</Link>
        </Navbar.Brand>
      </Navbar.Header>
    <Nav bsStyle="pills">
      { props.user_info!=null ?
        <Nav>
          <NavItem>
            <Link to='/profile'>Profile</Link>
          </NavItem>
        <NavItem>
          <Link to='/add'>Add Track</Link>
        </NavItem>
        </Nav>:
        <NavItem href='http://localhost:3030/login'>Login</NavItem>
      }
    </Nav>
  </Navbar>
  )
};

export default Sidebar;
