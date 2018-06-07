import React, { Component } from 'react';
import axios from 'axios';

class AuthSuccess extends Component {
  constructor(props){
    super(props)
    this.state = {
      data: null,
    }

    let tokens = JSON.parse(this.props.tokens);
    this.props.sendTokens(tokens);
    this.access_token = tokens.access_token;
    this.refresh_token = tokens.refresh_token;

  }

  componentDidMount(){
    axios({
      url: 'https://api.spotify.com/v1/me',
      headers: {
        'Authorization': 'Bearer '+this.access_token
      }
    })
      .then(response => {
        console.log(response.data);
        this.setState({data: response.data})
      })
      .catch(err => console.log(err));
    }


  render(){
    return (
      <div>Welcome {this.state.data!=null ? this.state.data.display_name : 'User'}</div>
    )
  }
}

export default AuthSuccess;
