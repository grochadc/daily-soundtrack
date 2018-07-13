import React from "react";
import { Link } from "@reach/router";
import { Navbar, Nav, NavItem } from "react-bootstrap";

function Sidebar(props) {
  let { loggedIn } = props;
  return (
    <Navbar fixedTop>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to="/">Daily Soundtrack</Link>
        </Navbar.Brand>
      </Navbar.Header>
      <Nav bsStyle="pills">
        {loggedIn ? (
          <Nav>
            <NavItem>
              <Link to={"/playlist/" + props.user_info.id}>My Tracks</Link>
            </NavItem>
            <NavItem>
              <Link to="/add">Add Track</Link>
            </NavItem>
            <NavItem>
              <Link to="/dashboard">Dashboard</Link>
            </NavItem>
          </Nav>
        ) : (
          <NavItem href="/login">Login</NavItem>
        )}
      </Nav>
      {loggedIn && (
        <Nav pullRight>
          <NavItem>
            <Link to={"/profile"}>{props.user_info.display_name}</Link>
          </NavItem>
          <NavItem>
            <Link to="/logout">Logout</Link>
          </NavItem>
        </Nav>
      )}
    </Navbar>
  );
}

export default Sidebar;
