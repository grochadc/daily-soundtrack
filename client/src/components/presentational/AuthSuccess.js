import React, { Component } from "react";
import { Link } from "@reach/router";
import { sign } from "jsonwebtoken";

class AuthSuccess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }

  componentDidMount() {
    let User = JSON.parse(this.props.userdocument);
    this.props.handleData(User);
    localStorage.setItem(
      "daily-soundtrack",
      sign({ userid: User._id }, process.env.REACT_APP_WEBTOKEN_SECRET)
    );
  }

  render() {
    return (
      <div>
        <div>
          Welcome{" "}
          {this.state.data != null ? this.state.data.display_name : "User"}
        </div>
        <Link to="/profile">Profile</Link>
      </div>
    );
  }
}

export default AuthSuccess;
