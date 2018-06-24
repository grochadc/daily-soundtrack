import React, { Component } from "react";
import { PageHeader } from "react-bootstrap";
import Playlist from "../Playlist";
import axios from "axios";

class UserTracks extends Component {
  constructor(props) {
    super(props);
    this.query = {
      type: "query",
      value: { user: props.user }
    };
    this.follow = this.follow.bind(this);
    this.unfollow = this.unfollow.bind(this);
  }
  follow(user) {
    axios
      .post("/follow", {
        currentUser: this.props.currentUser,
        follow: user
      })
      .then(({ data }) => {
        console.log(data);
        this.props.follow(user);
      });
  }

  unfollow(user) {
    console.log("Called for unfollow");
    let that = this;
    axios
      .post("/unfollow", {
        currentUser: this.props.currentUser,
        unfollow: user
      })
      .then(({ data }) => {
        console.log(data);
        that.props.unfollow(user);
      })
      .catch(err => console.error(err));
  }
  render() {
    return (
      <div>
        <PageHeader>{this.props.user}'s Playlist</PageHeader>
        {this.props.following.includes(this.props.user) ? (
          <button onClick={() => this.unfollow(this.props.user)}>
            Unfollow
          </button>
        ) : (
          <button onClick={() => this.follow(this.props.user)}>Follow</button>
        )}
        <Playlist query={this.query} />
      </div>
    );
  }
}

export default UserTracks;
