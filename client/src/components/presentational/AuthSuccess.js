import React, { Component } from 'react';
import { Link } from '@reach/router';
import axios from 'axios';
import { sign } from 'jsonwebtoken';

class AuthSuccess extends Component {
  constructor(props){
    super(props)
    this.state = {
      data: null,
    }

    this.tokens = JSON.parse(this.props.tokens);
    this.access_token = this.tokens.access_token;
    this.refresh_token = this.tokens.refresh_token;

  }

  componentDidMount(){
    axios({
      url: 'https://api.spotify.com/v1/me',
      headers: {
        'Authorization': 'Bearer '+this.access_token
      }
    })
      .then(response => {
        this.props.handleData(response.data)
        localStorage.setItem('jwt',sign({user_info: response.data}, 'supersecret'));
      })
      .catch(err => console.log(err));
    }


  render(){
    console.log(this.state.data);
    return (
      <div>
      <div>Welcome {this.state.data!=null ? this.state.data.display_name : 'User'}</div>
      <Link to='/profile'>Profile</Link>
      </div>
    )
  }
}

export default AuthSuccess;
