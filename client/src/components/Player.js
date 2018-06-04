import React, { Component } from 'react';
import axios from 'axios';
import Loading  from './Loading';

export default class Player extends Component {
  constructor(){
    super();
    this.state = {
      track: null
    }
  }
  componentDidMount(){
    let that = this;
    let query = {
      _id: this.props.id
    }
    axios.get('http://localhost:3030/api/v1/Track?query='+JSON.stringify(query),{
      headers: {
        'Content-type': 'application-json'
      }
    })
    .then(function (response) {
      let { uri } = response.data[0]

      let track = uri.substr(uri.lastIndexOf(':')+1);
      that.setState({track: track});
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  render(){
    let URL = 'https://open.spotify.com/embed/track/'+this.state.track;
    return(
      <div className='player'>
        {this.state.track===null ?
          <Loading /> :
          <div align="center"><iframe src={URL} width="300" height="380" frameBorder="0" allowtransparency="true" allow="encrypted-media" title='currentTrack'></iframe></div>}
      </div>
    )
  }
}
